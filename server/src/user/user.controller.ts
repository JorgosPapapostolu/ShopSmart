import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) { }

  @Post('register')
  async registerUser(@Body() userData: { username: string; email: string; password: string }) {
    return this.userService.register(userData);
  }

  @Post('login')
  async loginUser(@Body() userData: { username: string; email: string; password: string }) {
    const user = await this.userService.login(userData);
    return this.authService.login(user);
  }
}