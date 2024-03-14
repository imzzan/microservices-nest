/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Inject, UnauthorizedException } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller()
export class IndentityController {
  constructor(
    private readonly identityService: IdentityService,
    @Inject('NOTIFICATION_SERVICE') private readonly client: ClientProxy,
  ) {}

  @MessagePattern('register')
  async register(@Payload() payload: RegisterDto) {
    try {
      const response = await this.identityService.create(payload);
      return {
        status: 'OK',
        message: 'Success',
        data: response,
      };
    } catch (error) {
      return error.response;
    }
  }

  @MessagePattern('login')
  async login(@Payload() payload: LoginDto) {
    try {
      const response = await this.identityService.login(payload);
      this.client.send("loginnotif", "Login Success")
      return {
        status: 200,
        message: 'Success',
        data: response,
      };
    } catch (error) {
      return error.response;
    }
  }

  @MessagePattern('verify-token')
  async verifyToken(@Payload() token: string) {
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const user = this.identityService.verifyToken(token);
      return user;
    } catch (error) {
      return error.response;
    }
  }

  @MessagePattern('decode-token')
  async decodeToken(@Payload() token: string) {
    if (!token) return;
    try {
      return this.identityService.decodeToken(token);
    } catch (error) {
      return error.response;
    }
  }

  @MessagePattern('getuser')
  async getUser() {
    try {
      const response = await this.identityService.getUser();
      return {
        status: 'OK',
        message: 'Success',
        data: response,
      };
    } catch (error) {
      return error.response;
    }
  }

  @MessagePattern('detailUser')
  async getUserById(@Payload() id: string) {
    try {
      const user = await this.identityService.getUserId(id);
      return {
        status: 'OK',
        message: 'Success get detail user',
        data: user,
      };
    } catch (error) {
      return error.response;
    }
  }

  @MessagePattern('updateUser')
  async updateUser(@Payload() payload: { id: string; payload: RegisterDto }) {
    try {
      const response = await this.identityService.updateUser(
        payload.id,
        payload.payload,
      );
      return {
        status: 'OK',
        message: 'Success',
        data: response,
      };
    } catch (error) {
      return error.response;
    }
  }

  @MessagePattern('deleteUser')
  async deleteUser(@Payload() id: string) {
    try {
      await this.identityService.deleteUser(id);
      return {
        status: 'OK',
        message: 'Success',
      };
    } catch (error) {
      return error.response;
    }
  }

  @MessagePattern('only-me')
  async OnlyMe(@Payload() token : string) {
    console.log(token);
  }
}
