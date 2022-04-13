import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  //  Lets add socket functionalities to join the room/ to send message / to get message...

  private socket: Socket;
  private url = 'http://localhost:3000'; // your server local path

  constructor() {
    this.socket = io(this.url, {
      transports: ['websocket', 'polling', 'flashsocket'],
    });
  }
  joinRoom(data: any): void {
    this.socket.emit('join', data);
  }
  sendMessage(data: any): void {
    this.socket.emit('message', data);
  }
 getMessage(): Observable<any> {
    return new Observable<{ user: string; message: string; room: any }>((observer) => {
      this.socket.on('new message', (data) => {
        console.log(data)
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }
  // getStorage() {
  //   const storage: any = localStorage.getItem('chats');
  //   return storage ? JSON.parse(storage) : [];
  // }
  // returnMessage(data: any) {
  //   // console.log(JSON.stringify(data))
  //   return JSON.stringify(data);
  // }
}
