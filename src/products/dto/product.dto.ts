import { Expose, Transform, plainToClass } from "class-transformer";
import { Types } from "mongoose";

export class ProductDto {
  @Expose()
  @Transform((params) => params?.obj?._id?.toString())
  _id: Types.ObjectId;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  currencyId: string;

  @Expose()
  currencyFormat: string;

  @Expose()
  isFreeShipping: boolean;

  @Expose()
  style: string;

  @Expose()
  categories: string[];

  @Expose()
  stock: number;

  @Expose()
  availableSizes: string[];
}
