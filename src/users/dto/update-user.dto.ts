import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  MinLength,
  MaxLength,
  IsAlpha,
  IsOptional,
} from "class-validator";
import { Address } from "../interface/address.interface";
import { UpdateAddressDto } from "./address-update.dto";
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  @IsOptional()
  fname: string;

  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  @IsOptional()
  lname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @IsOptional()
  password: string;

  @IsOptional()
  address: {
    shipping: UpdateAddressDto;
    billing: UpdateAddressDto;
  };
}
