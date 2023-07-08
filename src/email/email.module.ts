import { Module } from "@nestjs/common";
import { EmailService } from "./email.service";
import { EmailController } from "./email.controller";
import { MailerModule } from "@nestjs-modules/mailer";
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "rohitttesting@gmail.com",
          pass: "kcawyjkvbrajojfp",
        },
      },
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
