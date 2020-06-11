import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Navegacion } from '../clases/navegacion';
import { NavegacionAdmin } from '../clases/navegacion-admin';
import { NavegacionPaciente } from '../clases/navegacion-paciente';
import { NavegacionProfesional } from '../clases/navegacion-profesional';
import { Usuario } from '../clases/usuario';
import { TipoUsuario } from '../enum/tipo-usuario.enum';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  usuario: Usuario;
  navegacion: Navegacion;

  constructor(public auth: AuthService, public router: Router) {  }

  canActivate(): boolean {
    this.verificarUsuario();
    if (!this.auth.isAuthenticated() && !this.puedeNavegar(this.router.url)) {
      this.router.navigate(['Login']);
      return false;
    }
    return true;
  }

  verificarUsuario = () =>  {
    this.usuario = this.auth.obtenerUsuarioActual();
    if(this.usuario){
      this.obtenerNavegacion();
    }
  }

  puedeNavegar = (link): boolean => this.navegacion.puedeNavegar(link);

  private obtenerNavegacion = () => {
    switch (this.usuario.tipo) {
      case TipoUsuario.ADMIN:
        this.navegacion = new NavegacionAdmin();
        break;
      case TipoUsuario.PACIENTE:
        this.navegacion = new NavegacionPaciente();
        break;
      case TipoUsuario.PROFESIONAL:
        this.navegacion = new NavegacionProfesional();
        break;
      default:
        break;
    }

  }
}
