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
  updateForm = new FormGroup({
    desde: new FormControl('', Validators.required),
    hasta: new FormControl('', Validators.required),
    dias: new FormControl('', Validators.required)
  });
  selectSelections: Array<DAYS_OF_WEEK>;
  especialidadesForm;
  diasDeLaSemana = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
  usuario: Profesional;

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuarioActual() as Profesional;
    this.updateForm.controls.desde.setValue(this.usuario.desde);
    this.updateForm.controls.hasta.setValue(this.usuario.hasta);
    this.updateForm.controls.dias.setValue(this.usuario.dias);
    this.selectSelections = this.usuario.dias || [];
  }

  cancelar() {
    this.router.navigate(['']);
  }

  actualizarDatos = () => {
    this.usuario.desde = this.updateForm.controls.desde.value;
    this.usuario.hasta = this.updateForm.controls.hasta.value;
    this.usuario.dias = this.updateForm.controls.dias.value;
    this.authService.aprobarUsuario(this.usuario);
  }

}
