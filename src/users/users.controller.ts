import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { SerializeInterceptor } from "src/interceptors/serialize.interceptor";

@Controller("users")
// @UseInterceptor(new SerializeInterceptor())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/signup")
  create(@Body() createUserDto: CreateUserDto) {
    console.log(CreateUserDto);
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}

function UseInterceptor(
  arg0: SerializeInterceptor
): (target: typeof UsersController) => void | typeof UsersController {
  throw new Error("Function not implemented.");
}
// function UseInterceptor(
//   arg0: SerializeInterceptor
// ): (target: typeof UsersController) => void | typeof UsersController {
//   throw new Error("Function not implemented.");
// }
