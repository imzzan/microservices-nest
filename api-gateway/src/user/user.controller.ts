/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserInterceptor } from 'src/interceptor/user.interceptor';
import { UserRequest } from 'src/inetrface/user';

@Controller('/')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post('register')
  register(@Body() payload: RegisterDto) {
    const message = this.client.send('register', payload);
    return message;
  }

  @Post('login')
  login(@Body() payload: LoginDto) {
    const response = this.client.send('login', payload);
    return response
  }

  @UseGuards(AuthGuard)
  @Get('users')
  getUser() {
    const message = this.client.send('getuser', {});
    return message;
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  @Get('me')
  getUserById(@Req() req: UserRequest) {
    const id = req.user.id;
    const message = this.client.send('detailUser', id);
    return message;
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  @Put('me')
  updateUser(@Req() req: UserRequest, @Body() payload: RegisterDto) {
    const id = req.user.id;
    const message = this.client.send('updateUser', { id, payload });
    return message;
  }

  @UseGuards(AuthGuard)
  @Delete('users/:id')
  deleteUser(@Req() req: Request) {
    const id = req.params.id;
    const message = this.client.send('deleteUser', id);
    return message;
  }
}
