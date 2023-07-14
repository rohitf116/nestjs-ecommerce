import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductModel } from "./entities/product.model";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductModel }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
