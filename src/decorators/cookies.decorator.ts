import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Types } from "mongoose";

export const cookiesFromRequest = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request);
    const { accessToken } = request?.cookies || null;
    console.log(accessToken);
    if (!accessToken) {
      throw new UnauthorizedException("acessToken missing");
    }

    return accessToken;
  }
);
