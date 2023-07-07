import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import * as bcrypt from "bcrypt";
import { Address } from "../interface/address.interface";
import { AddressDto } from "../dto/create-address.dto";
import { OTP } from "../interface/otp.interface";
import { Communication } from "../interface/communication.interface";
import { OTPDto } from "../dto/otp.dto";
import { CommunicationDto } from "../dto/communication.dto";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  fname: string;

  @Prop()
  lname: string;

  @Prop({ type: CommunicationDto })
  email: CommunicationDto;

  @Prop({ type: OTPDto })
  otp: {
    email: OTP;
    phone: OTP;
  };

  @Prop()
  profileImage: string;

  @Prop({ type: CommunicationDto })
  phone: CommunicationDto;

  @Prop()
  password: string;

  @Prop({ type: AddressDto })
  address: {
    shipping: AddressDto;
    billing: AddressDto;
  };
}
export const UserModel = SchemaFactory.createForClass(User);

UserModel.pre("save", async function (next) {
  if (this.isModified("password")) {
    // this.tokenVersion += 1;
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
