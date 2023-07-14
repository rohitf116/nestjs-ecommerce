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
import { Type } from "class-transformer";
import { AvailableSize } from "../enum/size.enum";

export class SizeQuantityItemDto {
  [key: string]: number;
}
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  price: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(CurrencyId)
  currencyId: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(CurrencyFormat)
  currencyFormat: string;

  @IsBoolean()
  @IsNotEmpty()
  isFreeShipping: boolean;

  @IsString()
  @IsNotEmpty()
  style: string;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsArray()
  @IsEnum(Categories, { each: true })
  categories: Categories[];

  @IsArray()
  @IsEnum(AvailableSize, { each: true })
  availableSizes: string[];
}
