import { Schema, Prop } from "@nestjs/mongoose";

@Schema({ _id: false })
export class OTPDto {
  @Prop()
  expiry: Date;
  @Prop()
  value: number;
}
