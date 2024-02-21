"use server";

import { AuthError } from "next-auth";
import { isNil, isString } from "lodash";
import { faker } from "@faker-js/faker/locale/ko";
import { asset } from "@prisma/client";
import moment from "moment";
import { vBirthday, vEmail, vPassword, vPhone } from "@/ex/validate";
import { isBlank, isNotNil } from "@/ex/utils";
import { ERR } from "@/lib/errorEx";
import prisma from "@/lib/prisma";
import { compare, getHash } from "@/ex/bcryptEx";
import { taskMailer } from "@/lib/taskMailer";
import {
  CheckPasswordActionType,
  EditPasswordActionType,
  err,
  FindIdActionType,
  FindPasswordActionType,
  ok,
  ShowUserActionType,
  SignInActionType,
  SignUpActionType,
} from "@/type/definitions";
import { awsModel } from "@/lib/aws";
import { auth, signIn } from "./auth/auth";

// TODO :: 코드 중복이 많으니까 class 형으로 바꿔보자

export const signInAction: SignInActionType = async (prevState, formData) => {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    // email, password validation
    const validEmail = vEmail(email);
    if (isNotNil(validEmail)) {
      return err(validEmail);
    }

    const validPassword = vPassword(password);
    if (isNotNil(validPassword)) {
      return err(validPassword);
    }

    await signIn("credentials", formData);

    return ok({ result: true });
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return err(ERR.NOT_FOUND("유저"));
        default:
          return err(ERR.SIGN_ING_FAILED);
      }
    }

    console.error(e);
    return err(ERR.INTERNAL_SERVER);
  }
};

export const findIdAction: FindIdActionType = async (prevState, formData) => {
  try {
    const name = formData.get("name");
    const phone = formData.get("phone");

    if (isNil(name) || isBlank(name)) {
      return err(ERR.REQUIRED("이름"));
    }

    if (isNil(phone) || isBlank(phone)) {
      return err(ERR.REQUIRED("휴대폰"));
    }

    if (!isString(name)) {
      return err(ERR.ONLY_STRING("이름"));
    }

    if (!isString(phone)) {
      return err(ERR.ONLY_STRING("휴대폰"));
    }

    if (vPhone(phone)) {
      return err(ERR.BAD_FORMAT("휴대폰"));
    }

    const user = await prisma.user.findFirst({
      where: { name, phone },
    });

    if (isNil(user)) {
      return err(ERR.NOT_FOUND("유저"));
    }

    return ok({ id: user.email });
  } catch (e) {
    if (e instanceof Error) {
      return err(e.message);
    }

    console.error(e);
    return err(ERR.INTERNAL_SERVER);
  }
};

export const findPasswordAction: FindPasswordActionType = async (prevState, formData) => {
  try {
    const name = formData.get("name");
    const email = formData.get("email");

    if (isNil(name) || isBlank(name)) {
      return err(ERR.REQUIRED("이름"));
    }

    if (isNil(email) || isBlank(email)) {
      return err(ERR.REQUIRED("이메일"));
    }

    if (!isString(name)) {
      return err(ERR.ONLY_STRING("이름"));
    }

    if (!isString(email)) {
      return err(ERR.ONLY_STRING("이메일"));
    }

    if (vEmail(email)) {
      return err(ERR.BAD_FORMAT("이메일"));
    }

    const user = await prisma.user.findUnique({
      where: {
        name,
        email,
      },
    });

    if (isNil(user)) {
      return err(ERR.NOT_FOUND("유저"));
    }

    // 비밀번호 갱신
    const purePassword = faker.internet.password({
      prefix: "!",
    });
    const newPassword = await getHash(purePassword);
    await prisma.user.update({
      where: user,
      data: {
        password: newPassword,
      },
    });

    // 새 비밀번호 mail 로 전송
    const res = await taskMailer.sendPassword(email, purePassword);

    return ok({ result: res });
  } catch (e) {
    if (e instanceof Error) {
      return err(e.message);
    }

    console.error(e);
    return err(ERR.INTERNAL_SERVER);
  }
};

export const signUpAction: SignUpActionType = async (prevState, formData) => {
  const session = await auth();
  const user = session?.user;

  // 로그인이 안되있으면 회원가입
  if (isNil(user)) {
    const validation = await singUpFieldValidate(formData);

    if (typeof validation === "string") {
      return err(validation);
    }

    const { profile, email, password, name, birthday, phone, message, introduce } = validation;

    try {
      await prisma.user.create({
        data: {
          email,
          password,
          name,
          birthday,
          phone,
          message,
          introduce,
          is_personal_information_agree: true,
          main_image: {
            connect: {
              pk: profile.pk,
            },
          },
        },
      });

      return ok({ result: true });
    } catch (e) {
      if (e instanceof Error) {
        return err(e.message);
      }

      return err(ERR.INTERNAL_SERVER);
    }
  }

  // 로그인이 되어있다면 회원 정보 수정
  try {
    const userData = await prisma.user.findUnique({ where: { pk: user.pk } });

    if (isNil(userData)) {
      return err(ERR.NOT_FOUND("유저 데이터"));
    }

    const validation = await editUserFieldValidate(formData);

    if (isString(validation)) {
      return err(validation);
    }

    const { profile, name, birthday, phone, message, introduce } = validation;

    await prisma.user.update({
      where: {
        pk: user.pk,
      },
      data: {
        main_image: {
          connect: {
            pk: profile.pk,
          },
        },
        name,
        birthday,
        phone,
        message,
        introduce,
      },
    });

    return ok({ result: true });
  } catch (e) {
    if (e instanceof Error) {
      return err(e.message);
    }

    console.error(e);
    return err(ERR.INTERNAL_SERVER);
  }
};

async function singUpFieldValidate(formData: FormData): Promise<
  | string
  | {
      profile: asset;
      email: string;
      password: string;
      name: string;
      birthday: Date;
      phone: string;
      message: string;
      introduce: string;
    }
> {
  const uuid = formData.get("uuid");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");
  const name = formData.get("name");
  const birthday = formData.get("birthday");
  const phone = formData.get("phone");
  const message = formData.get("message");
  const introduce = formData.get("introduce");
  const isPersonalInfoConsentGiven = formData.get("isPersonalInfoConsentGiven");

  if (isNil(uuid)) {
    return ERR.REQUIRED("프로필 사진");
  }

  if (isNil(email)) {
    return ERR.REQUIRED("이메일");
  }

  if (isNil(password)) {
    return ERR.REQUIRED("비밀번호");
  }

  if (isNil(confirmPassword)) {
    return ERR.REQUIRED("비밀번호 재확인");
  }

  if (isNil(name)) {
    return ERR.REQUIRED("이름");
  }

  if (isNil(birthday)) {
    return ERR.REQUIRED("생년월일");
  }

  if (isNil(phone)) {
    return ERR.REQUIRED("휴대폰");
  }

  if (isNil(message)) {
    return ERR.REQUIRED("상태 메세지");
  }

  if (isNil(introduce)) {
    return ERR.REQUIRED("자기 소개");
  }

  if (isNil(isPersonalInfoConsentGiven)) {
    return ERR.REQUIRED("개인 정보 동의");
  }

  if (!isString(uuid)) {
    return ERR.ONLY_STRING("프로필 사진");
  }

  if (isBlank(uuid)) {
    return ERR.REQUIRED("프로필 사진");
  }

  // 프로필 사진 유효성
  const profile = await awsModel.assetFromUuid(uuid);

  if (isNil(profile)) {
    return ERR.REQUIRED("프로필 사진");
  }

  if (!isString(email)) {
    return ERR.ONLY_STRING("이메일");
  }

  if (isBlank(email)) {
    return ERR.REQUIRED("이메일");
  }

  // 이메일 중복 검사
  const isEmailExist = await prisma.user.findFirst({ where: { email } });
  if (isNotNil(isEmailExist)) {
    return ERR.EMAIL_DUPLICATE;
  }

  if (!isString(password)) {
    return ERR.ONLY_STRING("비밀번호");
  }

  if (isBlank(password)) {
    return ERR.REQUIRED("비밀번호");
  }

  if (!isString(confirmPassword)) {
    return ERR.ONLY_STRING("비밀번호 재확인");
  }

  if (isBlank(confirmPassword)) {
    return ERR.REQUIRED("비밀번호 재확인");
  }

  // 비밀번호 체크 유효성
  if (password !== confirmPassword) {
    return ERR.PASSWORD_NOT_MATCH;
  }

  // 비밀번호 정규식 유효성
  const validPassword = vPassword(password);
  if (isNotNil(validPassword)) {
    return validPassword;
  }

  if (!isString(name)) {
    return ERR.ONLY_STRING("이름");
  }

  if (isBlank(name)) {
    return ERR.REQUIRED("이름");
  }

  if (!isString(birthday)) {
    return ERR.ONLY_STRING("생년월일");
  }

  if (isBlank(birthday)) {
    return ERR.REQUIRED("생년월일");
  }

  // 생년월일 유효성
  const validBirthday = vBirthday(birthday);
  if (isNotNil(validBirthday)) {
    return validBirthday;
  }

  if (!isString(phone)) {
    return ERR.ONLY_STRING("휴대폰");
  }

  if (isBlank(phone)) {
    return ERR.REQUIRED("휴대폰");
  }

  // 휴대폰 번호 유효성
  const validPhone = vPhone(phone);
  if (isNotNil(validPhone)) {
    return validPhone;
  }

  if (!isString(message)) {
    return ERR.ONLY_STRING("상태 메세지");
  }

  if (isBlank(message)) {
    return ERR.REQUIRED("상태 메세지");
  }

  if (!isString(introduce)) {
    return ERR.ONLY_STRING("자기 소개");
  }

  if (!isString(isPersonalInfoConsentGiven)) {
    return ERR.ONLY_STRING("개인 정보 동의");
  }

  // 개인 정보 수집 동의 유효성
  if (isPersonalInfoConsentGiven !== "on") {
    return ERR.PERSONAL_INFORMATION_AGREE;
  }

  return {
    profile,
    email,
    password: await getHash(password),
    name,
    birthday: moment(birthday, "YYMMDD").toDate(),
    phone,
    message,
    introduce,
  };
}

async function editUserFieldValidate(formData: FormData): Promise<
  | string
  | {
      profile: asset;
      name: string;
      birthday: Date;
      phone: string;
      message: string;
      introduce: string;
    }
> {
  const uuid = formData.get("uuid");
  const name = formData.get("name");
  const birthday = formData.get("birthday");
  const phone = formData.get("phone");
  const message = formData.get("message");
  const introduce = formData.get("introduce");

  if (isNil(uuid)) {
    return ERR.REQUIRED("프로필 사진");
  }

  if (isNil(name)) {
    return ERR.REQUIRED("이름");
  }

  if (isNil(birthday)) {
    return ERR.REQUIRED("생년월일");
  }

  if (isNil(phone)) {
    return ERR.REQUIRED("휴대폰");
  }

  if (isNil(message)) {
    return ERR.REQUIRED("상태 메세지");
  }

  if (isNil(introduce)) {
    return ERR.REQUIRED("자기 소개");
  }

  if (!isString(uuid)) {
    return ERR.ONLY_STRING("프로필 사진");
  }

  if (isBlank(uuid)) {
    return ERR.REQUIRED("프로필 사진");
  }

  // 프로필 사진 유효성
  const profile = await awsModel.assetFromUuid(uuid);

  if (isNil(profile)) {
    return ERR.REQUIRED("프로필 사진");
  }

  if (!isString(name)) {
    return ERR.ONLY_STRING("이름");
  }

  if (isBlank(name)) {
    return ERR.REQUIRED("이름");
  }

  if (!isString(birthday)) {
    return ERR.ONLY_STRING("생년월일");
  }

  if (isBlank(birthday)) {
    return ERR.REQUIRED("생년월일");
  }

  // 생년월일 유효성
  const validBirthday = vBirthday(birthday);
  if (isNotNil(validBirthday)) {
    return validBirthday;
  }

  if (!isString(phone)) {
    return ERR.ONLY_STRING("휴대폰");
  }

  if (isBlank(phone)) {
    return ERR.REQUIRED("휴대폰");
  }

  // 휴대폰 번호 유효성
  const validPhone = vPhone(phone);
  if (isNotNil(validPhone)) {
    return validPhone;
  }

  if (!isString(message)) {
    return ERR.ONLY_STRING("상태 메세지");
  }

  if (isBlank(message)) {
    return ERR.REQUIRED("상태 메세지");
  }

  if (!isString(introduce)) {
    return ERR.ONLY_STRING("자기 소개");
  }

  return {
    profile,
    name,
    birthday: moment(birthday, "YYMMDD").toDate(),
    phone,
    message,
    introduce,
  };
}

export const showUserAction: ShowUserActionType = async () => {
  try {
    const session = await auth();
    const user = session?.user;

    if (isNil(user)) {
      return err(ERR.NOT_SIGN_USER);
    }

    const userData = await prisma.user.findUnique({
      include: {
        main_image: true,
      },
      where: {
        pk: user.pk,
      },
    });

    if (isNil(userData)) {
      return err(ERR.NOT_FOUND("유저 데이터"));
    }

    return ok({
      profile: awsModel.toFileSet(userData.main_image),
      email: userData.email,
      name: userData.name,
      birthday: moment(userData.birthday).format("YYMMDD"),
      phone: userData.phone,
      message: userData.message,
      introduce: userData.introduce,
    });
  } catch (e) {
    if (e instanceof Error) {
      return err(e.message);
    }

    console.error(e);
    return err(ERR.INTERNAL_SERVER);
  }
};

export const checkPasswordAction: CheckPasswordActionType = async (prevState, formData) => {
  try {
    const session = await auth();
    const globalUser = session?.user;

    if (isNil(globalUser)) {
      return err(ERR.NOT_SIGN_USER);
    }

    const password = formData.get("password");
    const validPassword = vPassword(password);

    if (!isString(password)) {
      return err(ERR.ONLY_STRING("비밀번호"));
    }

    if (isNotNil(validPassword)) {
      return err(validPassword);
    }

    const user = await prisma.user.findUnique({
      where: {
        pk: globalUser.pk,
      },
    });

    if (isNil(user)) {
      return err(ERR.NOT_SIGN_USER);
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return err(ERR.PASSWORD_WRONG);
    }

    return ok({ result: true });
  } catch (e) {
    if (e instanceof Error) {
      return err(e.message);
    }

    console.error(e);
    return err(ERR.INTERNAL_SERVER);
  }
};

export const editPasswordAction: EditPasswordActionType = async (prevState, formData) => {
  const session = await auth();
  const globalUser = session?.user;

  if (isNil(globalUser)) {
    return err(ERR.NOT_SIGN_USER);
  }

  const password = formData.get("new-password");
  const confirmPassword = formData.get("confirm-password");

  if (!isString(password)) {
    return err(ERR.ONLY_STRING("비밀번호"));
  }

  if (!isString(confirmPassword)) {
    return err(ERR.ONLY_STRING("비밀번호"));
  }

  if (password !== confirmPassword) {
    return err(ERR.PASSWORD_NOT_MATCH);
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        pk: globalUser.pk,
      },
    });

    if (isNil(user)) {
      return err(ERR.NOT_SIGN_USER);
    }

    const hashedPassword = await getHash(password);
    await prisma.user.update({
      where: {
        pk: user.pk,
      },
      data: {
        password: hashedPassword,
      },
    });

    return ok({ result: true });
  } catch (e) {
    if (e instanceof Error) {
      return err(e.message);
    }

    console.error(e);
    return err(ERR.INTERNAL_SERVER);
  }
};
