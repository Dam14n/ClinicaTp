import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { Profesional } from 'src/app/clases/profesional';
import { DAYS_OF_WEEK } from 'angular-calendar';

@Component({
  selector: 'app-configuracion-profesional',
  templateUrl: './configuracion-profesional.component.html',
  styleUrls: ['./configuracion-profesional.component.css']
})
export class ConfiguracionProfesionalComponent implements OnInit {
  signUpForm = new FormGroup({
    desde: new FormControl('', Validators.required),
    hasta: new FormControl('', Validators.required),
    dias: new FormControl('', Validators.required)
  });
  selectSelections: Array<DAYS_OF_WEEK>;
  especialidadesForm;
  diasDeLaSemana = ['Lunes','Martes','Miercoles','Jueves','Viernes'];

  onSeleccionarEspecialidad = () => { }

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  cancelar() {
    this.router.navigate(['']);
  }

  actualizarDatos = () => {
    let usuario = this.authService.obtenerUsuarioActual() as Profesional;
    usuario.desde = this.signUpForm.controls.desde.value;
    usuario.hasta = this.signUpForm.controls.hasta.value;
    usuario.dias = this.signUpForm.controls.dias.value;
    this.authService.aprobarUsuario(usuario);
  }

}
