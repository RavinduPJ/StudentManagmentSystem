import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { WebsocketService } from './websocket.service';
import { NotificationService } from "@progress/kendo-angular-notification";
import { Store } from '@ngrx/store';
import { updateStatus } from './State/student.actions';

const socket = io("http://localhost:3000");

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  output:any;
  notificationService: NotificationService;

  constructor(private websocketService:WebsocketService,notificationService:NotificationService,private store:Store<{student:boolean}>) {
    this.notificationService=notificationService
  }

  public showNotification(msg:string): void {
    this.notificationService.show({
      content: `${msg}`,
      animation: { type: "fade", duration: 800 },
      type: { style: "success", icon: true },
      position: { horizontal: "center", vertical: "top" },
    });
  }

  ngOnInit(): void {
    this.output= new Observable(observer => {
      socket.on('msgToClient', msg => {
        observer.next(msg);
        // observer.next((id:string)=>{
        //   return msg + id;
        // });
      })
    })  
    

    this.output.subscribe((msg:any)=>{
      this.store.dispatch(updateStatus({value:3}))
     this.showNotification("Excel Read Completed Successfully")

      console.log(msg,socket.id)
     
    })
  }

  

}
