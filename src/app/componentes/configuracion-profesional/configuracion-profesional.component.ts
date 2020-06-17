import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profesional } from 'src/app/clases/profesional';
import { DIAS_DE_LA_SEMANA } from 'src/app/enum/dias-de-la-semana.enum';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-configuracion-profesional',
  templateUrl: './configuracion-profesional.component.html',
  styleUrls: ['./configuracion-profesional.component.css']
})
export class ConfiguracionProfesionalComponent implements OnInit {
  updateForm = new FormGroup({
    desde: new FormControl('', Validators.required),
    hasta: new FormControl('', Validators.required),
    dias: new FormControl('', Validators.required),
    duracion: new FormControl('', Validators.required), 
  });
  selectSelections: Array<DIAS_DE_LA_SEMANA>;
  especialidadesForm;
  diasDeLaSemana = DIAS_DE_LA_SEMANA;
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
    this.updateForm.controls.duracion.setValue(this.usuario.duracion);
    this.selectSelections = this.usuario.dias || [];
  }

  cancelar() {
    this.router.navigate(['']);
  }

  actualizarDatos = () => {
    this.usuario.desde = this.updateForm.controls.desde.value;
    this.usuario.hasta = this.updateForm.controls.hasta.value;
    this.usuario.dias = this.updateForm.controls.dias.value;
    this.usuario.duracion = this.updateForm.controls.duracion.value;
    this.authService.actualizarUsuario(this.usuario);
    this.router.navigate(['Bienvenido']);
  }

}
