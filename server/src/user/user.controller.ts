import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  async registerUser(@Body() userData: { email: string; password: string }) {
    return this.userService.register(userData);
  }

  @Post('login')
  async loginUser(@Body() userData: { email: string; password: string }) {
    return this.userService.login(userData);
  }
}