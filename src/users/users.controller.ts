import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  UseGuards,
  Req,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {
  Serialize,
  SerializeInterceptor,
} from "src/interceptors/serialize.interceptor";
import { VerifyEmailDto } from "src/email/dto/verifyEmail.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "src/auth/auth.service";
import { UserDto } from "./dto/user.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { Public } from "src/auth/public";
import { ValidateObjectId } from "src/decorators/validobjectId.decortor";
import { Types } from "mongoose";
import { cookiesFromRequest } from "src/decorators/cookies.decorator";

@Serialize(UserDto)
@Controller("users")
@UseGuards(AuthGuard)
// @UseInterceptor(new SerializeInterceptor())
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService
  ) {}

  @Post("/signup")
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(CreateUserDto);
    return this.usersService.create(createUserDto);
  }

  @Patch("/verify")
  @Public()
  verifyEmail(
    @Query("email") email: string,
    @Body() verifyEmailDto: VerifyEmailDto,
    @Res() res: any
  ) {
    console.log(email);
    return this.usersService.verifyEmailOtp(email, verifyEmailDto.otp, res);
  }

  @Post("/signin")
  @Public()
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.signin(loginDto, res);
  }

  @Post("/resend")
  @Public()
  resendOtp(@Body() body: any, @Res() res: any) {
    return this.usersService.resendOtp(body.email, res);
  }

  //resendOtp
  //
  //

  // @Get()
  // findAll(@Req() req: any) {
  //   const token = req.user;
  //   console.log(token);
  //   console.log(req);
  //   return token;
  // }

  @Get("")
  findOne(@Req() req: any) {
    return req.user;
  }

  @Patch("")
  update(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    const id = req.user._id;
    console.log(id);
    return this.usersService.update(id, updateUserDto);
  }

  @Delete("")
  remove(@Req() req: any, @Res() res: any) {
    const id = req?.user?._id;
    return this.usersService.remove(id, res);
  }
}

// function UseInterceptor(
//   arg0: SerializeInterceptor
// ): (target: typeof UsersController) => void | typeof UsersController {
//   throw new Error("Function not implemented.");
// }
