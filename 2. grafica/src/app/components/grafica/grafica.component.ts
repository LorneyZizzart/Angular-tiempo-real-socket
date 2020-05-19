import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0], label: 'Ventas' }
  ];
  public lineChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril'];

  constructor(private http:HttpClient, private wsService:WebsocketService) { }

  ngOnInit() {
    this.getData();
    this.escucharSocket();
    // setInterval(()=>{
    //   const newData = [
    //     //numeros redondeados
    //     Math.round(Math.random() * 100),
    //     Math.round(Math.random() * 100),
    //     Math.round(Math.random() * 100),
    //     Math.round(Math.random() * 100),
    //   ];
    //   this.lineChartData = [
    //     {data: newData, label:'Ventas'}
    //   ];
    // }, 3000);
  }

  getData(){
    this.http.get('http://localhost:5000/grafica').subscribe((data:any) =>  this.lineChartData = data );
  }

  escucharSocket(){
    this.wsService.listen('cambio-grafica').subscribe((data:any)=>{
      console.log('socket: ',data);
      this.lineChartData = data;
    })
  }

}
