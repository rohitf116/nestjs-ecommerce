import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from "@nestjs/common";
import { Types } from "mongoose";

export const ValidateObjectId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const id = request.params.id;
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Invalid ObjectId");
    }

    return new Types.ObjectId(id);
  }
);
