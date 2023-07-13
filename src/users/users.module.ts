import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User, UserModel } from "./model/user.model";
import { MongooseModule } from "@nestjs/mongoose";
import { OtpService } from "./otp.service";
import { EmailModule } from "../email/email.module";
import { AuthService } from "src/auth/auth.service";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "src/auth/auth.guard";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserModel }]),
    EmailModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    OtpService,
    EmailModule,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
