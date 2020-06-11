import { Component } from '@angular/core';
import { Navegacion } from 'src/app/clases/navegacion';
import { NavegacionPaciente } from 'src/app/clases/navegacion-paciente';
import { Usuario } from 'src/app/clases/usuario';
import { TipoUsuario } from 'src/app/enum/tipo-usuario.enum';
import { AuthService } from 'src/app/servicios/auth.service';
import { NavegacionAdmin } from 'src/app/clases/navegacion-admin';
import { NavegacionProfesional } from 'src/app/clases/navegacion-profesional';

@Component({
  template: ``,
  styles: []
})
export class NavegacionComponent {
  usuario: Usuario;
  navegacion: Navegacion;

  constructor(private authService: AuthService) {
    this.usuario = this.authService.obtenerUsuarioActual();
    this.obtenerNavegacion();
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
