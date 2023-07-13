import { PartialType } from "@nestjs/mapped-types";
import { AddressDto } from "./create-address.dto";
import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
export class UpdateAddressDto extends PartialType(AddressDto) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  street: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  city: string;

  @IsNumber()
  @IsOptional()
  pincode: number;
}
