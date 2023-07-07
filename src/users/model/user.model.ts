import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import * as bcrypt from "bcrypt";
import { Address } from "../interface/address.interface";
import { AddressDto } from "../dto/create-address.dto";

@Schema({ timestamps: true })
export class User {
  @Prop()
  fname: string;

  @Prop()
  lname: string;

  @Prop({ unique: true })
  email: string;

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
