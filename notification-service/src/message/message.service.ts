/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class MessageService {

    constructor(private readonly events : EventsGateway){}
    
    async getNotif(message: string) {
        this.events.handleEvent(message);
        return message
    }

    loginNotif(message: string) {
        this.events.handleLogin(message);
        return message
    }    
}