import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { addMinutes, isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { Turno } from 'src/app/clases/turno';
import { TurnoEstado } from 'src/app/clases/turno-estado.enum';
import { AuthService } from 'src/app/servicios/auth.service';
import { TurnoService } from 'src/app/servicios/turno.service';
import { TipoUsuario } from 'src/app/enum/tipo-usuario.enum';
import { Router } from '@angular/router';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  green: {
    primary: '#3dff2c',
    secondary: '#a5f79e',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

// Basic configuration from https://angular-calendar.com

@Component({
  selector: 'app-ver-turnos',
  templateUrl: './ver-turnos.component.html',
  styleUrls: ['./ver-turnos.component.css']
})
export class VerTurnosComponent {
  @ViewChild('modalProfesional', { static: true }) modalProfesional: TemplateRef<any>;
  @ViewChild('modalPaciente', { static: true }) modalPaciente: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  modalData: { action: string; event: CalendarEvent; };
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = true;
  estadosTurno = TurnoEstado;
  displayedColumns: string[] = ['nombre', 'valor'];

  constructor(private modal: NgbModal, private turnoService: TurnoService, private authService: AuthService, private router: Router) {
    this.turnoService.obtenerTurnosParaUsuario(this.authService.obtenerUsuarioActual()).subscribe(turnos => this.cargarTurnos(turnos));
  }

  cargarTurnos(turnos: Turno[]) {
    this.events = [];
    turnos.forEach(turno => {
      let dia = turno.dia.toDate();
      const horario = turno.horario.split(':');
      dia.setHours(+horario[0], +horario[1]);
      this.events.push({
        color: this.obtenerColor(turno),
        start: dia,
        title: 'Turno paciente ' + turno.paciente.nombre,
        end: addMinutes(dia, turno.profesional.duracion),
        meta: turno
      });
    })
  }

  obtenerColor = (turno: Turno) => {
    switch (turno.estado) {
      case this.estadosTurno.ACEPTADO:
        return colors.green;
      case this.estadosTurno.RECHAZADO:
        return colors.red;
      default:
        return colors.yellow;
    }
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    if (this.authService.obtenerUsuarioActual().tipo === TipoUsuario.PROFESIONAL) {
      this.modal.open(this.modalProfesional, { size: 'lg' });
    } else {
      this.modal.open(this.modalPaciente, { size: 'lg' });
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  actualizarTurno = (event: CalendarEvent, turno: Turno, estado: TurnoEstado, closePopOver: Function) => {
    turno.estado = estado || turno.estado;
    event.color = this.obtenerColor(turno);
    this.turnoService.actualizarTurno(turno);
    closePopOver();
  }

  atender = (turno: Turno, closePopOver: Function) => {
    closePopOver();
    this.router.navigate(['Atender', turno.id]);
  }

}
