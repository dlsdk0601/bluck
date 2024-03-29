import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { config } from "@/config/config";
import { isNotNil } from "@/ex/utils";

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

    return isNotNil(res);
  }

  async sendPassword(to: string, newPassword: string): Promise<string> {
    const options = {
      to,
      subject: "[BLUCK] 새로운 비밀번호 변경 안내",
      text: this.newPasswordText(newPassword),
    };

    const res = await this.sendEmail(options);

    if (!res) {
      return "비밀번호 전송을 실패하였습니다.";
    }

    return "이메일로 새로운 비밀번호를 전송했습니다.";
  }

  newPasswordText(newPassword: string) {
    return `새로운 비밀번호는 ${newPassword} 입니다.`;
  }
}

export const taskMailer = new TaskMailer();
