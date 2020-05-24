import { NgModule } from '@angular/core';
// importo del module principal
import { RouterModule } from '@angular/router';
import { ErrorComponent } from '../componentes/error/error.component';
import { LoginComponent } from '../componentes/login/login.component';
import { RegistroComponent } from '../componentes/registro/registro.component';

const MiRuteo = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  { path: 'Registro', component: RegistroComponent },
  { path: '**', component: ErrorComponent },
  { path: 'error', component: ErrorComponent }];

@NgModule({
  imports: [
    RouterModule.forRoot(MiRuteo)
  ],
  exports: [
    RouterModule
  ]
})
export class RuteoModule { }
