import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Usuario } from 'src/app/clases/usuario';
import { TipoUsuario } from 'src/app/enum/tipo-usuario.enum';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.css']
})
export class VerUsuariosComponent implements OnInit {
  usuarios: Array<Usuario>;
  tiposUsuario = TipoUsuario;
  displayedColumns: string[] = ['nombre' ,'email', 'tipo' , 'estaAprobado'];

  constructor(private authService: AuthService) {
    this.usuarios = [];
  }

  ngOnInit(): void {
    this.authService.obtenerUsuarios().subscribe(usuarios => this.usuarios = usuarios);
  }

  aprobarUsuario = (usuario: Usuario) => {
    usuario.estaAprobado = true;
    this.authService.aprobarUsuario(usuario);
  }

}
