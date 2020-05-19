export class GraficaData {
    private meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril'];
    private valores:number[] = [0, 0, 0, 0];

    constructor(){}

    getDataGrafica(){
        return [{data: this.valores, label: 'Ventas' }];
    }

    incrementarValor(mes:string, valor:number){
        mes = (mes.charAt(0).toUpperCase() + mes.slice(1)).trim();  //trim para limpiar los espacios
        for(let i in this.meses){ // in al parecer solo lo toma como indices
            if(this.meses[i] === mes){
                console.log('asd: ',this.meses[i], valor);
                this.valores[i] += valor;
            }
        }

        return this.getDataGrafica();

    }
        
}