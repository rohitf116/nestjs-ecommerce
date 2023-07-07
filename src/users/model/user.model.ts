import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import * as bcrypt from "bcrypt";
import { Address } from "../interface/address.interface";
import { AddressDto } from "../dto/create-address.dto";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  fname: string;

  @Prop()
  lname: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ default: false })
  isVerifed: boolean;

  @Prop()
  profileImage: string;

  @Prop({ unique: true })
  phone: number;

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
