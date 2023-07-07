import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  MinLength,
  MaxLength,
  IsAlpha,
} from "class-validator";

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
  phone: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  password: string;
}
//
