import { Expose, Transform, plainToClass } from "class-transformer";

export class ProductDto {
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
