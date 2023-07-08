import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User, UserModel } from "./model/user.model";
import { MongooseModule } from "@nestjs/mongoose";
import { OtpService } from "./otp.service";
import { EmailModule } from "../email/email.module";
console.log(EmailModule);
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserModel }]),
    EmailModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, OtpService, EmailModule],
})
export class UsersModule {}
