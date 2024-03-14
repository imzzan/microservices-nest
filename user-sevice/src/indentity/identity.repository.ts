/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { User } from './enity/user';

@Injectable()
export class IdentityRepository {

    constructor(private readonly prisma: PrismaService){}
    Create(payload: RegisterDto): Promise<User> {
        return this.prisma.user.create({
            data: payload
        })
    }   

    FindByEmail(email: string): Promise<User> {
        return this.prisma.user.findFirst({
            where: { email }
        })
    }

    getUser(): Promise<User[]> {
        return this.prisma.user.findMany()
    }

    findById(id: string) : Promise<any> {
        return this.prisma.user.findUnique({
            where: {id},
            select: {
                id: true,
                name: true,
                email: true,
                city: true,
                country: true
            }
        })
    }

    update(id: string, payload: RegisterDto) : Promise<any> {
        return this.prisma.user.update({
            where: {id},
            data: payload,
            select: {
                id: true,
                name: true,
                email: true,
                city: true,
                country: true
            }
        })
    }

    deleteUser(id: string) : Promise<User> {
        return this.prisma.user.delete({
            where: {id}
        })
    }
}
