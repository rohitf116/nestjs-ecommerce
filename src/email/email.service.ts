import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject,
      text,
    });
  }

  async registrationMail(to: string, otp: number) {
    const subject = "Otp for verification";
    const text = `you otp ${otp} is valid for 10 minuts`;
    await this.sendEmail(to, subject, text);
  }
}
