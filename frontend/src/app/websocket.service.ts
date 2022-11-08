import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable()
export class WebsocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  // EMITTER example
  sendMessage(msg: string) {
    this.socket.emit('sendMessage', { message: msg });
  }

  // HANDLER example
  onNewMessage() {
    return new Observable(observer => {
      this.socket.on('msgToClient', msg => {
        observer.next(msg);
      });
    });
  }

  
}