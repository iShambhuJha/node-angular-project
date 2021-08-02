import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import io from 'socket.io-client';
import { IDrivers } from '../models/drivers';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  readonly uri:string = 'http://localhost:3000';
  socket:any;
  constructor() {
    this.socket = io(this.uri);
   }
  listen(event: string): Observable<IDrivers[]>{
    return new Observable((subscriber)=>{
      this.socket.on(event, (data:any) => {
        subscriber.next(data);
      })
    })
  }

  // emit(event: string, data: any){
  //   this.socket.emit(event,data);
  // }
}
