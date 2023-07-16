import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from "./create-product.dto";
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
  IsEnum,
  IsBoolean,
  IsArray,
  ValidateNested,
} from "class-validator";
import { CurrencyId } from "../enum/currencyId.enum";
import { CurrencyFormat } from "../enum/currencyFormat.enum";
import { Categories } from "../enum/categories.enum";
import { AvailableSize } from "../enum/size.enum";

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @IsOptional()
  price: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsEnum(CurrencyId)
  currencyId: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsEnum(CurrencyFormat)
  currencyFormat: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  isFreeShipping: boolean;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  style: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @Min(1)
  stock: number;

  @IsArray()
  @IsEnum(Categories, { each: true })
  @IsOptional()
  categories: Categories[];

  @IsArray()
  @IsOptional()
  @IsEnum(AvailableSize, { each: true })
  availableSizes: string[];
}
