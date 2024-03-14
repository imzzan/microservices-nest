/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/websockets/gateways#gateways
*/

import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server<any, any>;

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string) {
    this.server.emit('events', data);
  }

  @SubscribeMessage('message')
  sendMessage(@MessageBody() data: any) {
    this.server.emit('message', data)
  }

  @SubscribeMessage('loginnotif')
  handleLogin(@MessageBody() data: string) {
    this.server.emit('loginnotif', data)
  }

  handleConnection() {
    console.log('User connected');
  }

  handleDisconnect() {
    console.log('User disconnected');
  }

  afterInit() {
    console.log('Socket is live');
  }
}
