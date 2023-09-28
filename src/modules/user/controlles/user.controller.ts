import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from '../services/user.service';
import { GetUserDto } from '../dto/get-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test-get')
  test(@Query() dto: GetUserDto) {
    console.log(dto);
    return this.userService.findOne(dto);
  }

  @Post('test-post')
  testPost(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
