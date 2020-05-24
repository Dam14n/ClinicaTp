import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { ErrorComponent } from './componentes/error/error.component';
import { RuteoModule } from './ruteo/ruteo.module';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    RuteoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
