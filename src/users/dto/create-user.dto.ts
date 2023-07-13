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
  Matches,
  Min,
  Max,
} from "class-validator";
import { UpdateAddressDto } from "./address-update.dto";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  fname: string;

  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  lname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(6000000000)
  @Max(9999999999)
  phone: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  password: string;
}
//
