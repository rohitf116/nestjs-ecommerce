import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { AvailableSize } from "../enum/size.enum";
import { CurrencyId } from "../enum/currencyId.enum";
import { CurrencyFormat } from "../enum/currencyFormat.enum";
import { Categories } from "../enum/categories.enum";

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  currencyId: CurrencyId;

  @Prop()
  currencyFormat: CurrencyFormat;

  @Prop()
  isFreeShipping: boolean;

  @Prop()
  productImage: string;

  @Prop()
  stock: number;

  @Prop()
  style: string;

  @Prop()
  categories: Categories[];

  @Prop()
  availableSizes: string[];

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const ProductModel = SchemaFactory.createForClass(Product);
