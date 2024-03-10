// auth.controller.ts

import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { UsersService } from '../services/users.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;

    // Replace this with your actual user validation logic
    const user = await this.usersService.getUser({ username, password });
    if (user.length === 0) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const payload = { username };
    return { token: this.jwtService.sign(payload) };
  }
}
