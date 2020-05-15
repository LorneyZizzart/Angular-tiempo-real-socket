import { Router, Request, Response} from 'express'
import Server from '../class/server';
import { usuariosConectados } from '../sockets/socket';

const router = Router();

router.get('/mensajes', (req:Request, res:Response) => {
    res.json({
        ok:true,
        mensajes:'Todo esta bien !!'
    });
})

router.post('/mensajes', (req:Request, res:Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = { de, cuerpo };

    const server = Server.instance;

    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok:true,
        cuerpo : cuerpo,
        de: de
    });
})

router.post('/mensajes/:id', (req:Request, res:Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = { de, cuerpo };

    const server = Server.instance;

    server.io.in(id).emit('mensaje-privado', payload);

    res.json({
        ok:true,
        cuerpo,
        de
    });
})

//obtenemos todos los ids usuarios
router.get('/usuarios', (req:Request, res:Response) => {

    const server = Server.instance;
    server.io.clients((err:any, clientes:string[])=>{
        if(err){
            res.json({ok:false, err})
        }
        res.json({
            ok:true,
            clientes
        })
    });    
})

// obtner usuarios sus ids y sus nombres
router.get('/usuarios/detalle', (req:Request, res:Response) => {
    usuariosConectados 

    res.json({
        ok:true,
        clientes: usuariosConectados.getLista()
    })
})

export default router;