import { MailerService } from "@nestjs-modules/mailer";
import { BadRequestException, Injectable } from "@nestjs/common";
import { OTP_ON_REGISTRATION } from "./constants/email.constants";
import { REGISTRATION_TEXT } from "./constants/email.text";
import { User } from "src/users/model/user.model";

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
    const subject = OTP_ON_REGISTRATION;
    const text = REGISTRATION_TEXT(otp);
    await this.sendEmail(to, subject, text);
  }
  async resendOtpMail(to: string, otp: number) {
    const subject = OTP_ON_REGISTRATION;
    const text = REGISTRATION_TEXT(otp);
    await this.sendEmail(to, subject, text);
  }

  verifyEmailWithOtp(otp: number, user: User): boolean {
    if (user.otp.expiry < new Date()) {
      throw new BadRequestException("Otp is expired");
    }
    if (otp !== user.otp.value) {
      throw new BadRequestException("Incorrect otp");
    }
    return true;
  }
}
