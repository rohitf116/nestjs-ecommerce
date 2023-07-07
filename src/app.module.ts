import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { ProductsModule } from "./products/products.module";
import { CartsModule } from "./carts/carts.module";
import { MongooseModule } from "@nestjs/mongoose";
import { OrdersModule } from "./orders/orders.module";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://rohit_sonawane:SuperSu@cluster0.e9hjfiy.mongodb.net/nest-ecommerce"
    ),
    UsersModule,
    ProductsModule,
    CartsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
