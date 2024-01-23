import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { isNil } from "lodash";
import { config } from "@/config/config";

export class TaskMailer {
  private transporter = nodemailer.createTransport({
    service: config.mailer_service,
    auth: {
      user: config.mailer_auth_user,
      pass: config.mailer_auth_pass,
    },
  });

  async sendEmail(options: Mail.Options) {
    const res = await this.transporter.sendMail(options);

    if (isNil(res)) {
      return false;
    }

    return true;
  }

  async sendPassword(to: string, newPassword: string): Promise<string> {
    const options = {
      from: "no-reply@gmail.com",
      to,
      subject: "새로운 비밀번호 변경 안내",
      text: this.newPasswordText(newPassword),
    };

    const res = await this.sendEmail(options);

    if (!res) {
      return "새로운 비밀번호를 전송했습니다.";
    }

    return "비밀번호 전송을 실패하였습니다.";
  }

  newPasswordText(newPassword: string) {
    return `<div>새로운 비밀번호는 ${newPassword} 입니다.</div>`;
  }
}

export const taskMailer = new TaskMailer();
