import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ErrorComponent } from './componentes/error/error.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AngularFirebaseModule } from './modulos/angular-firebase/angular-firebase.module';
import { AngularMaterialModule } from './modulos/angular-material/angular-material.module';
import { RuteoModule } from './modulos/ruteo/ruteo.module';
import { EnumToArrayPipe } from './pipe/enum-to-array.pipe';
import { ExcludeFilterPipe } from './pipe/exclude-filter.pipe';




@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    ErrorComponent,
    EnumToArrayPipe,
    ExcludeFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RuteoModule,
    MatNativeDateModule,
    AngularMaterialModule,
    AngularFirebaseModule,
    ReactiveFormsModule
  ],
  providers: [EnumToArrayPipe, ExcludeFilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
