import { Socket } from "socket.io";
import socketIO from 'socket.io'
import { UusarioLista } from '../class/usuarios-lista';
import { Usuario } from "../class/usuario";


export const usuariosConectados = new UusarioLista();

export const conectarCliente = (cliente:Socket) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

export const desconectar = (cliente:Socket) =>{
    cliente.on('disconnect', ()=>{
        usuariosConectados.borrarUsuario(cliente.id);
    });
}

export const mensaje = (cliente:Socket, io:socketIO.Server) =>{
    cliente.on('mensaje', (payload:{de:String, cuerpo:string})=>{
        console.log('Mensaje recibido: ', payload);
        io.emit('mensaje-nuevo', payload);
    })
}

export const configurarUsuario = (cliente:Socket, io:socketIO.Server) =>{
    cliente.on('configurar-usuario', (payload:{nombre:string}, callback:Function)=>{
        
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

        callback({
            ok:true,
            mensaje:`Usuario ${payload.nombre}, configurado en la API REST`
        });
    })
}