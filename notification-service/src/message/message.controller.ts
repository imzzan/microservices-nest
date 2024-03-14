/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessageService } from './message.service';

@Controller()
export class MessageController {

    constructor(private readonly service : MessageService){}

    @MessagePattern('say')
    create(@Payload() payload: string) {
        try {
            return this.service.getNotif(payload)
        } catch (error) {
            return error.response
        }
    }

    @MessagePattern('loginnotif')
    login(@Payload() payload: string) {
        try {
            return this.service.loginNotif(payload)
        } catch (error) {
            return error.response
        }
    }
}
