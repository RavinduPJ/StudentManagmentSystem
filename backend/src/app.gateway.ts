/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server,Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayInit,OnGatewayConnection,OnGatewayDisconnect{
 
  @WebSocketServer() wss:Server
  private logger:Logger=new Logger("AppGateway")

  afterInit(server: Server) {
    this.logger.log("initiated!!")
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected:  ${client.id}`)
  }
  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client Connected:  ${client.id}`)
  }

  handleMessage( text: any) {
    console.log("handlingMessage")
    this.wss.emit('msgToClient',text)
  }

  @SubscribeMessage('msgToServer')
  handleTestMessage(client: Socket, text: string):void {
    client.emit('msgToClient',text)
    console.log(text,client.id)
  }
}
