import { IsNumber } from "class-validator";
export class VerifyEmailDto {
  @IsNumber()
  otp: number;
}
