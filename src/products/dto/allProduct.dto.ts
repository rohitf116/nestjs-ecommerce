import { Transform } from "class-transformer";
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

export class AllProductDto {
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  priceGreaterThan: number;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  priceLesserThan: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  size: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  categories: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  page: number;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  limit: number;
}
