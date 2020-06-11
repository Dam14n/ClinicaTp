import { NgModule } from '@angular/core';
// importo del module principal
import { RouterModule } from '@angular/router';
import { BienvenidoComponent } from 'src/app/componentes/bienvenido/bienvenido.component';
import { AuthGuardService } from 'src/app/servicios/auth-guard.service';
import { ErrorComponent } from '../../componentes/error/error.component';
import { LoginComponent } from '../../componentes/login/login.component';
import { RegistroComponent } from '../../componentes/registro/registro.component';

const MiRuteo = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  { path: 'Registro', component: RegistroComponent },
  { path: 'Bienvenido', component: BienvenidoComponent, canActivate: [AuthGuardService] },
  { path: '**', redirectTo: 'Login' },
  { path: 'error', component: ErrorComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(MiRuteo)
  ],
  exports: [
    RouterModule
  ]
})
export class RuteoModule { }
