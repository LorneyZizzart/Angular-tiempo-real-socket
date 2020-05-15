import { Usuario } from "./usuario";

export class UusarioLista {

    private lista:Usuario[] = [];

    constructor() {
        
    }

    public agregar(usuario:Usuario){
        this.lista.push(usuario);
        console.log('this.lista');
        console.log(this.lista);
        return usuario;        
    }

    public actualizarNombre(id:string, nombre:string){
        for(let usuario of this.lista){
            if(usuario.id === id){
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('actualizando usuario');
        console.log(this.lista);
    }

    public getLista(){
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }

    public getUsuario(id:string){
        //Buscando el usuario por el id
        return this.lista.find(usuario => usuario.id === id);
    }

    public getUsuariosSala(sala:string){
        return this.lista.filter(usuario => usuario.sala === sala);
    }

    public borrarUsuario(id:string){
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => {
            return usuario.id !== id;
        });
        return tempUsuario;
    }
}