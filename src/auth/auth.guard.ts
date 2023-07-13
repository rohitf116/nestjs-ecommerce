import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { Request } from "express";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "./public";
import { UsersService } from "src/users/users.service";
import { JWTPayload } from "src/interface/jwt.interface";
import { User } from "src/users/model/user.model";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.cookies["accessToken"] || null;
    console.log(token, "toekn");

    // const request = context.switchToHttp().getRequest();
    // const token = request.cookies?.["accessToken"] || null;
    // console.log(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: "Test123@334",
      });
      request["user"] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    try {
      console.log(request.user);
      const user: any = await this.userService.findOne(request.user._id);
      if (!user) {
        throw new NotFoundException();
      }
      console.log(user);
      request["user"] = user;
    } catch (error) {
      throw new NotFoundException();
    }
    return true;
  }
}
