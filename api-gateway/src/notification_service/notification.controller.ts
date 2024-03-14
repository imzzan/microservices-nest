/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('messages')
export class NotificationController {
    
    constructor(@Inject('NOTIFICATION_SERVICE') private readonly client: ClientProxy){}

    @Get('/')
    create() {
        return this.client.send('say', 'Muhamad Muzani')
    }

    @Get('/notif')
    getNotif() {
        return this.client.send('chat', 'This is Muhamad Muzani')
    }
}
