import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../class/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus:boolean = false;
  public usuario:Usuario = null;

  constructor(private socket: Socket) {
    this.cargarStorge();
    this.checkStatus();
   }

  checkStatus(){
    this.socket.on('connect', ()=>{
      console.log('Conectado al servidor');
      this.socketStatus = true;
      this.cargarStorge();
    });

    this.socket.on('disconnect', ()=>{
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }

  emit(evento:string, payload?:any, callback?:Function){
    console.log('Emitiendo');
    
    this.socket.emit(evento, payload, callback);
  }

  listen(evento:string){
    return this.socket.fromEvent(evento);
  }

  loginWS(nombre:string){
    return new Promise((resolve, reject)=>{
      this.socket.emit('configurar-usuario', {nombre}, resp => {
        this.usuario = new Usuario(nombre);
        this.guardarStorge();
        resolve();
      });
    });    
  }

  getUsuario(){ 
    return this.usuario;
  }

  guardarStorge(){
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorge(){
    if(localStorage.getItem('usuario')){
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.loginWS(this.usuario.nombre);
    }
  }

}
