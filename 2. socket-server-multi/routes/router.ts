import { Router, Request, Response} from 'express'
import Server from '../class/server';
import { usuariosConectados } from '../sockets/socket';
import { GraficaData } from '../class/grafica';
import Connect from '../class/connectDB';

const router = Router();
const grafica = new GraficaData();
const connection = new Connect()

router.get('/grafica', (req:Request, res:Response) => {
    res.json(grafica.getDataGrafica());

    //Prueba de connecion a la DB sql Server
    connection.connection();

})

router.post('/grafica', (req:Request, res:Response) => {

    const mes = req.body.mes;
    const unidades = Number(req.body.unidades);

    grafica.incrementarValor(mes, unidades);

    res.json(grafica.getDataGrafica());

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