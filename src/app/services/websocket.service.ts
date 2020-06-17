import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})

export class WebsocketService {

  public socketStatus = false;

  constructor( private socket: Socket ) {
    
    this.checkStatus();    
  }


  //Revisar el estado del servidor
    checkStatus() {

      this.socket.on('connect', () => {
        this.socketStatus = true;
      });

      this.socket.on('disconnect', () => {
        console.log('Desconectado del servidor');
        this.socketStatus = false;
      });
    }

    //Metodo para realizar emisiones de eventos
    emit( evento: string, payload?: any, callback?: Function ) {

      console.log('Emitiendo', evento);
      // emit('EVENTO', payload, callback?)
      this.socket.emit( evento, payload, callback );

    }

    //Escucha cualquier evento
    listen( evento: string ) {
      return this.socket.fromEvent( evento );
    }


}
