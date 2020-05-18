import mssql from 'mssql';


export default class Connect {

    private config = {
        user: 'sa',
        password: 'password',
        server: "192.168.0.103",
        database: "CRMCOMERCIAL",
        "options": {
            "encrypt": true,
            "enableArithAbort": true
        },
    }
    constructor(){   }

    async connection(){
        var query = "SELECT * FROM Contacto";
        const ConnectionPool = await new mssql.ConnectionPool(this.config).connect();
        const RequestPool = await ConnectionPool.request().query(query);
        const result  = await RequestPool.recordset; 
        console.log(result[0]);
    }
}