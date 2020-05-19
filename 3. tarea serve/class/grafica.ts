export class GraficaData {
    private valores:number[] = [0, 0, 0, 0];

    constructor(){}

    getDataGrafica(){
        return [{data: this.valores, label: 'Cuestionario' }];
    }

    incrementarValor(posicion:number, valor:number){

        this.valores[posicion] += valor;

        return this.getDataGrafica();

    }
        
}