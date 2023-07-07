import { Address } from "cluster";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";
export class AddressDto {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsNumber()
  pincode: number;
}
