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

  @Post("/signin")
  @Public()
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.signin(loginDto, res);
  }
  //
  //

  @Get()
  @Public()
  findAll(@Req() req: any) {
    const token = req.user;
    console.log(token);
    return token;
  }
  @Patch()
  verifyEmail(
    @Query("email") email: string,
    @Body() verifyEmailDto: VerifyEmailDto
  ) {
    return this.usersService.verifyEmailOtp(email, verifyEmailDto.otp);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}

// function UseInterceptor(
//   arg0: SerializeInterceptor
// ): (target: typeof UsersController) => void | typeof UsersController {
//   throw new Error("Function not implemented.");
// }
