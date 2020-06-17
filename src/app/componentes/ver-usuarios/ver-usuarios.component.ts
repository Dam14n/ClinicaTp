import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { firestore } from 'firebase';
import { Usuario } from 'src/app/clases/usuario';
import { TipoUsuario } from 'src/app/enum/tipo-usuario.enum';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.css']
})
export class VerUsuariosComponent implements OnInit {
  usuarios = new MatTableDataSource<Usuario>();
  tiposUsuario = TipoUsuario;
  displayedColumns: string[] = ['nombre', 'email', 'tipo', 'estaAprobado'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageEvent: PageEvent;

  constructor(private authService: AuthService) {
    this.usuarios.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.paginator.pageSizeOptions = [3, 5, 10, 20];
    this.paginator.pageSize = 3;
    this.authService.obtenerTotalUsuarios().then(totalCount => {
      this.pageEvent = {
        pageIndex: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize,
        length: totalCount
      };
      this.paginator.length = totalCount;
      this.onPageChange(this.pageEvent);
    })

  }

  aprobarUsuario = (usuario: Usuario) => {
    usuario.estaAprobado = true;
    this.authService.actualizarUsuario(usuario);
  }

  onPageChange = (paginado: PageEvent) => {
    this.authService.obtenerUsuarios(paginado, this.getLastCreation()).then(usuarios => this.usuarios.data = usuarios);
  }

  private getLastCreation(): any {
    return !this.usuarios.data.length || this.paginator.pageIndex === 0 ? undefined : this.usuarios.data[this.usuarios.data.length - 1];
  }

}
