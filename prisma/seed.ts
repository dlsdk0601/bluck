import { join } from "node:path";
import { readdirSync, readFileSync } from "node:fs";
import { Prisma, PrismaClient } from "@prisma/client";
import { Faker, ko } from "@faker-js/faker";
import moment from "moment/moment";
import { isNil } from "lodash";
import mime from "mime-types";
import { getHash } from "@/ex/bcryptEx";
import { awsModel } from "@/lib/aws";

const prisma = new PrismaClient();

// seed 도 bun 으로 돌리고 싶지만,
// Command was killed with SIGSEGV (Segmentation fault) 에러가 나기 때문에
// ts-node 로 밖에 되지 않는다.
async function main() {
  console.log("----------------Faker Insert Start----------------");

  const faker = new Faker({ locale: ko });

  await prisma.asset.createMany({
    data: await assets(),
  });

  // await prisma.user.createMany({
  //   data: await users(faker),
  // });
  //
  // await prisma.tag.createMany({
  //   data: await tags(faker),
  // });
  //
  // await prisma.blog.createMany({
  //   data: await blogs(faker),
  // });

  console.log("----------------Faker Insert Success----------------");
}

async function users(faker: Faker): Promise<Prisma.userCreateManyInput[]> {
  const users: Prisma.userCreateManyInput[] = [];

  // test 계정
  users.push({
    email: "test@test.com",
    password: await getHash("1234"),
    name: "테스터",
    birthday: moment("1992-06-01").toDate(),
    phone: "01022223333",
    message: faker.lorem.sentences(),
    introduce: faker.lorem.paragraphs(),
    main_image_pk: 1,
    is_personal_information_agree: true,
  });

  for (let i = 0; i < 20; i++) {
    // eslint-disable-next-line no-await-in-loop
    const password = await getHash(faker.internet.password());
    const user = {
      email: faker.internet.email(),
      password,
      name: faker.internet.userName(),
      birthday: faker.date.birthdate(),
      phone: faker.phone.number(),
      message: faker.lorem.sentences(),
      introduce: faker.lorem.paragraphs(),
      main_image_pk: 2,
      is_personal_information_agree: true,
    };

    users.push(user);
  }

  return users;
}

async function assets(): Promise<Prisma.assetCreateInput[]> {
  const assets: Prisma.assetCreateInput[] = [];

  const temp = join(import.meta.dir, "..", "tmp");
  const files = readdirSync(temp, { withFileTypes: true });

  for (let i = 0; i < files.length; i++) {
    const entry = files[i];

    if (!entry.isFile()) {
      continue;
    }

    const filePath = join(temp, entry.name);
    const file = readFileSync(filePath);
    const fileBase64 = file.toString("base64");

    const contentType = mime.lookup(filePath);

    if (!contentType) {
      continue;
    }

    const asset = await awsModel.upload(contentType, entry.name, fileBase64);

    if (isNil(asset)) {
      continue;
    }

    assets.push(asset);
  }

  return assets;
}

async function tags(faker: Faker): Promise<Prisma.tagCreateManyInput[]> {
  const tags: Prisma.tagCreateManyInput[] = [];

  for (let i = 0; i < 50; i++) {
    tags.push({
      name: faker.lorem.word(64),
    });
  }

  return tags;
}

async function blogs(faker: Faker): Promise<Prisma.blogCreateManyInput[]> {
  const blogs: Prisma.blogCreateManyInput[] = [];

  for (let i = 0; i < 100; i++) {
    const sentences = faker.lorem.sentences({ min: 10, max: 200 });
    const body = `<p>${sentences.split(".").join("</p><p>")}</p>`;
    blogs.push({
      title: faker.lorem.words({ min: 3, max: 30 }),
      body,
      user_pk: i / 5 + 1,
    });
  }

  return blogs;
}

// bun 에서 await 를 안 붙이면 안되는데 이유를 모르겠다.
// 아마 async 로 정의 했으니 await 를 붙여야 하나 예상해본다.
await main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
