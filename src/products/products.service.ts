import {
  HttpCode,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Model, Connection, Types } from "mongoose";
import { InjectModel, InjectConnection } from "@nestjs/mongoose";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/product.model";
import { ProductAllInterFace } from "./interface/productAllFilter.interface";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectConnection() private connection: Connection
  ) {}
  async create(createProductDto: CreateProductDto) {
    const product = await this.productModel.create(createProductDto);
    return product;
  }

  async findAll(query: any) {
    const {
      priceGreaterThan,
      priceLesserThan,
      size,
      categories,
      page,
      limit = 10,
    }: {
      priceGreaterThan?: number;
      priceLesserThan?: number;
      size?: string;
      categories?: string;
      page?: number;
      limit?: number;
    } = query;
    const filter: ProductAllInterFace = {};
    if (priceGreaterThan) {
      filter.price = { $gte: priceGreaterThan };
    }
    if (priceLesserThan) {
      filter.price = { ...filter.price, $lte: priceLesserThan };
    }
    if (size) {
      const spliteSize = size.split(",");
      filter.availableSizes = { $in: spliteSize };
    }
    if (categories) {
      const spliteSize = categories.split(",");
      filter.categories = { $in: spliteSize };
    }
    const skip = (page - 1) * limit;
    const products = await this.productModel
      .find(filter)
      .skip(skip)
      .limit(limit);

    return products;
  }

  async findOne(id: Types.ObjectId) {
    const product = await this.productModel.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    return product;
  }

  async update(id: Types.ObjectId, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    Object.assign(product, updateProductDto);
    await product.save();
    return product;
  }

  async remove(id: Types.ObjectId, res: any) {
    const product = await this.productModel.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    product.isDeleted = true;
    product.deletedAt = new Date();
    await product.save();
    res.status(HttpStatus.OK).json({ message: "Product deleted successfully" });
  }
}
