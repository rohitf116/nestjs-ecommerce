import { Module, MiddlewareConsumer } from "@nestjs/common";

import { AppController } from "./app.controller";

import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { ProductsModule } from "./products/products.module";
import { CartsModule } from "./carts/carts.module";
import { MongooseModule } from "@nestjs/mongoose";
import { OrdersModule } from "./orders/orders.module";
import { EmailModule } from "./email/email.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://rohit_sonawane:SuperSu@cluster0.e9hjfiy.mongodb.net/nest-ecommerce"
    ),
    JwtModule.register({
      global: true,
      secret: "Test123@334",
      signOptions: { expiresIn: "36000s" },
    }),
    UsersModule,
    ProductsModule,
    CartsModule,
    OrdersModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
