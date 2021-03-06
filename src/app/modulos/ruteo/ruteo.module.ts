import { NgModule } from '@angular/core';
// importo del module principal
import { RouterModule } from '@angular/router';
import { BienvenidoComponent } from 'src/app/componentes/bienvenido/bienvenido.component';
import { CargarTurnosComponent } from 'src/app/componentes/cargar-turnos/cargar-turnos.component';
import { ConfiguracionProfesionalComponent } from 'src/app/componentes/configuracion-profesional/configuracion-profesional.component';
import { RegistroMasMenuComponent } from 'src/app/componentes/registro-mas-menu/registro-mas-menu.component';
import { VerTurnosComponent } from 'src/app/componentes/ver-turnos/ver-turnos.component';
import { VerUsuariosComponent } from 'src/app/componentes/ver-usuarios/ver-usuarios.component';
import { AuthGuardService } from 'src/app/servicios/auth-guard.service';
import { ErrorComponent } from '../../componentes/error/error.component';
import { LoginComponent } from '../../componentes/login/login.component';
import { RegistroComponent } from '../../componentes/registro/registro.component';
import { AtenderComponent } from 'src/app/componentes/atender/atender.component';
import { EstadisticasComponent } from 'src/app/componentes/estadisticas/estadisticas.component';

const MiRuteo = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  {
    path: 'Registro', children: [
      { path: '', component: RegistroComponent },
      { path: 'Admin', component: RegistroMasMenuComponent, canActivate: [AuthGuardService] },
    ]
  },
  { path: 'Configuracion', component: ConfiguracionProfesionalComponent, canActivate: [AuthGuardService] },
  {
    path: 'Turnos', canActivate: [AuthGuardService], children: [
      { path: '', component: VerTurnosComponent },
      { path: 'Cargar', component: CargarTurnosComponent },
    ]
  },
  { path: 'Atender/:turnoId', component: AtenderComponent, canActivate: [AuthGuardService] },
  { path: 'Usuarios', component: VerUsuariosComponent, canActivate: [AuthGuardService] },
  { path: 'Bienvenido', component: BienvenidoComponent, canActivate: [AuthGuardService] },
  { path: 'Estadisticas', component: EstadisticasComponent, canActivate: [AuthGuardService] },

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
