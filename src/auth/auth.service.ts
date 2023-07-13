import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { LoginDto } from "src/users/dto/login.dto";
import { User } from "src/users/model/user.model";
import { UsersService } from "src/users/users.service";
import { JWTPayload } from "src/interface/jwt.interface";
import { Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}
  async singup(createdUser: CreateUserDto) {
    const user = await this.userService.create(createdUser);
    return user;
  }
  async signin(loginDto: LoginDto, res: any) {
    const user = await this.userService.isEmailExist(loginDto.email);

    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      const payload = {
        _id: user._id.toString(),
        isAdmin: user.isAdmin,
        tokenVersion: user.tokenVersion,
      };
      const token = await this.jwtService.signAsync(payload);
      res.cookie("accessToken", token, { httpOnly: true });
      return user;
    }

    throw new UnauthorizedException("Check your credentials");
  }
}
