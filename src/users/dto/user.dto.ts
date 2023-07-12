import { Expose, Transform, plainToClass } from "class-transformer";
import {
  CommunicationDtoEmail,
  CommunicationDtoPhone,
} from "./communication.dto";
import { AddressDto } from "./create-address.dto";
import { Types } from "mongoose";
import { IsOptional } from "class-validator";

//
export class UserDto {
  @Expose()
  @IsOptional()
  @Transform((params) => params?.obj?._id?.toString())
  _id: Types.ObjectId;
  @Expose()
  fname: string;
  @Expose()
  lname: string;
  @Expose()
  profileImage: string;
  @Expose()
  isAdmin: boolean;

  @Expose()
  email: any;

  @Expose()
  phone: any;

  @Expose()
  isVerified: boolean;

  @Expose()
  address: {
    shipping: AddressDto;
    billing: AddressDto;
  };
}
