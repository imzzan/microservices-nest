/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { IdentityRepository } from './identity.repository';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcryot from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class IdentityService {

    constructor(
        private readonly userRepo: IdentityRepository,
        private jwtService: JwtService
        ){}

    async create(payload: RegisterDto) {

        const user = await this.userRepo.FindByEmail(payload.email)
        if (user) {
            throw new ConflictException("Email Sudah terdaftar")
        }

        const salt = await bcryot.genSalt(10)
        const hashPassword = await bcryot.hash(payload.password, salt)
        payload.password = hashPassword

        const newUser = await this.userRepo.Create(payload)
        return newUser
    }

    async login(payload: LoginDto) {
        const user = await this.userRepo.FindByEmail(payload.email)
        if (!user) {
            throw new ConflictException("Email Tidak terdaftar")
        }

        const matchPassword = await bcryot.compare(payload.password, user.password)
        if (!matchPassword) {
            throw new ConflictException()
        }

        const token = this.jwtService.sign({id: user.id, name: user.name, email: user.email})

        return token
    }

    verifyToken(token: string) {
        if (!token) {
            throw new UnauthorizedException()
        }
        try {
            const {user, exp} = this.jwtService.verify(token)
            return {user, exp}
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    decodeToken(token: string) {
        if (!token) {
            return;
        }
        return this.jwtService.decode(token)
    }

    async getUser() {
        const users = await this.userRepo.getUser()
        return users
    }

    async getUserId(id : string) {
        const user = await this.userRepo.findById(id)

        if (!user) {
            throw new NotFoundException()
        }
        return user
    }

    async updateUser(id: string, payload: RegisterDto) {
        const currentUser = this.getUserId(id)
        if (!currentUser) {
            throw new NotFoundException()
        }

        const user = await this.userRepo.update(id, payload)
        return user
    }

    async deleteUser(id: string) {
        const currentUser = this.getUserId(id)
        if (!currentUser) {
            throw new NotFoundException()
        }
        const user = this.userRepo.deleteUser(id)
        return user
    }
}
