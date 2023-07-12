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

@Serialize(UserDto)
@Controller("users")
// @UseInterceptor(new SerializeInterceptor())
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService
  ) {}

  @Post("/signup")
  create(@Body() createUserDto: CreateUserDto) {
    console.log(CreateUserDto);
    return this.usersService.create(createUserDto);
  }

  @Post("/login")
  login(@Body() loginDto: LoginDto, @Res() res: Response) {
    return this.authService.signin(loginDto, res);
  }
  //
  //login

  @Get()
  findAll() {
    return this.usersService.findAll();
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
