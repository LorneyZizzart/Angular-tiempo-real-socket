import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChartsModule } from 'ng2-charts';
const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GraficoComponent } from './components/grafico/grafico.component';

@NgModule({
  declarations: [
    AppComponent,
    GraficoComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    SocketIoModule.forRoot(config),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
