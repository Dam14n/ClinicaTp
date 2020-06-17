import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialidad } from 'src/app/clases/especialidad';
import { EspecialidadService } from 'src/app/servicios/especialidad.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Profesional } from 'src/app/clases/profesional';
import { Turno } from 'src/app/clases/turno';
import { TurnoService } from 'src/app/servicios/turno.service';
import { firestore } from 'firebase';

@Component({
  selector: 'app-cargar-turnos',
  templateUrl: './cargar-turnos.component.html',
  styleUrls: ['./cargar-turnos.component.css']
})
export class CargarTurnosComponent implements OnInit {
  turnoForm = new FormGroup({
    horario: new FormControl('', Validators.required),
    dia: new FormControl('', Validators.required),
    profesional: new FormControl('', Validators.required),
    especialidad: new FormControl('', Validators.required)
  });
  especialidades: Especialidad[];
  profesionales: Profesional[];

  constructor(
    private router: Router,
    private especialidadService: EspecialidadService,
    private authService: AuthService,
    private turnoService: TurnoService) {
  }

  ngOnInit(): void {
    this.especialidadService.obtenerEspecialidades().subscribe(especialidades => this.especialidades = especialidades);
  }

  cancelar() {
    this.router.navigate(['']);
  }

  pedirTurno = () => {
    let turno: Turno = {
      creacion: firestore.Timestamp.fromDate(new Date()),
      dia: firestore.Timestamp.fromDate(new Date(this.turnoForm.controls.dia.value)),
      horario: this.turnoForm.controls.horario.value,
      paciente: this.authService.obtenerUsuarioActual(),
      profesional: this.turnoForm.controls.profesional.value
    };
    this.turnoService.pedirTurno(turno);
    this.router.navigate(['Bienvenido']);
  }

  onSeleccionarEspecialidad = () => {
    this.authService.obtenerProfesionalesAprobados().then(profesionales => this.profesionales = profesionales);
  }
}
