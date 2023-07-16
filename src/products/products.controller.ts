import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Public } from "src/auth/public";
import { Serialize } from "src/interceptors/serialize.interceptor";
import { ProductDto } from "./dto/product.dto";
import { Types } from "mongoose";
import { ValidateObjectId } from "src/decorators/validobjectId.decortor";
import { AllProductDto } from "./dto/allProduct.dto";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Public()
  @Serialize(ProductDto, "Product created succesfully")
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Serialize(ProductDto, "Products fetched succesfully")
  findAll(@Query() query: AllProductDto) {
    return this.productsService.findAll(query);
  }

  @Get(":id")
  @Serialize(ProductDto, "Product fetched succesfully")
  findOne(@ValidateObjectId() id: Types.ObjectId) {
    return this.productsService.findOne(id);
  }

  @Patch(":id")
  @Serialize(ProductDto, "Products updated succesfully")
  update(
    @ValidateObjectId() id: Types.ObjectId,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(":id")
  remove(@ValidateObjectId() id: Types.ObjectId, @Res() res: any) {
    return this.productsService.remove(id, res);
  }
}
