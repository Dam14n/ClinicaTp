import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { ErrorComponent } from './componentes/error/error.component';
import { RuteoModule } from './modulos/ruteo/ruteo.module';
import { AngularMaterialModule } from './modulos/angular-material/angular-material.module';
import { AngularFirebaseModule } from './modulos/angular-firebase/angular-firebase.module';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    RuteoModule,
    AngularMaterialModule,
    AngularFirebaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
