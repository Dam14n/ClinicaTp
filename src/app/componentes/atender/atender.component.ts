import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { firestore } from 'firebase';
import { Admin } from 'src/app/clases/admin';
import { Paciente } from 'src/app/clases/paciente';
import { Profesional } from 'src/app/clases/profesional';
import { Usuario } from 'src/app/clases/usuario';
import { TipoUsuario } from 'src/app/enum/tipo-usuario.enum';
import { AuthService } from 'src/app/servicios/auth.service';
import { Turno } from 'src/app/clases/turno';
import { TurnoService } from 'src/app/servicios/turno.service';
import { TurnoEstado } from 'src/app/clases/turno-estado.enum';
@Component({
  selector: 'app-atender',
  templateUrl: './atender.component.html',
  styleUrls: ['./atender.component.css']
})
export class AtenderComponent implements OnInit {
  @Input() showAdmin = false;
  turno: Turno;
  turnoForm = new FormGroup({
    comentarioProfesional: new FormControl('', Validators.required),
    edad: new FormControl(0, Validators.required),
    temperatura: new FormControl('', Validators.required),
    presion: new FormControl('', Validators.required),
  });
  displayedColumns: string[] = ['nombre', 'valor', 'quitar'];
  informacionExtra = [];
  agregarCampoNuevo = false;
  campoNuevo = { nombre: '', valor: '' };

  constructor(
    private router: Router,
    private turnoService: TurnoService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.turnoService.obtenerTurnoPorId(params['turnoId']).subscribe(turnos => {
        this.turno = turnos[0];
        this.turnoForm.controls.comentarioProfesional.setValue(this.turno.comentarioProfesional);
        this.informacionExtra = this.turno.informacionExtra || [];
      });
    });
  }

  ngOnInit() { }

  cancelar() {
    this.router.navigate(['']);
  }

  completarAtencion = () => {
    this.turno.comentarioProfesional = this.turnoForm.controls.comentarioProfesional.value;
    this.informacionExtra.push({ nombre: 'Edad', valor: this.turnoForm.controls.edad.value });
    this.informacionExtra.push({ nombre: 'Temperatura', valor: this.turnoForm.controls.temperatura.value });
    this.informacionExtra.push({ nombre: 'Presion', valor: this.turnoForm.controls.presion.value });
    this.turno.informacionExtra = this.informacionExtra;
    this.turno.estado = TurnoEstado.FINALIZADO;
    this.turnoService.actualizarTurno(this.turno);
    this.router.navigate(['Bienvenido']);
  }

  onQuitarInfoExtra(campoExtra: any) {
    const indexSelect = this.informacionExtra.indexOf(campoExtra);
    this.informacionExtra.splice(indexSelect, 1);
    this.informacionExtra = new Array<any>(...this.informacionExtra);
  }

  actualizarInformacionExtra = () => {
    this.informacionExtra.push(this.campoNuevo);
    this.campoNuevo = { nombre: '', valor: '' };
    this.informacionExtra = new Array<any>(...this.informacionExtra);
  }

}
