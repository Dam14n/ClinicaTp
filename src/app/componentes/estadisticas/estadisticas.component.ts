import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { TurnoService } from 'src/app/servicios/turno.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { reduce } from 'rxjs/operators';
import { DIAS_DE_LA_SEMANA } from 'src/app/enum/dias-de-la-semana.enum';
import { of } from 'rxjs';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  tipoChart: string = 'column';
  title: string;
  chart: Chart;

  constructor(private turnoService: TurnoService, private usuarioService: AuthService) { }

  ngOnInit(): void {
    this.turnosPorDia();
  }

  crearChart(data: any[]) {
    let chart = new Chart({
      chart: {
        type: this.tipoChart
      },
      title: {
        text: this.title
      },
      credits: {
        enabled: false
      },
      series: data
    });
    this.chart = chart;
  }

  profPorDia = () => {

  }

  profPorHorario = () => {

  }

  turnosPorEspecialidad = () => {
    this.turnoService.obtenerTurnosPorEspecialidad()    
    .subscribe(data => {
      this.title = 'Turnos Por Especialidad';
      this.crearChart(data);
    });
  }

  turnosPorDia = () => {
    this.turnoService.obtenerTurnosPorDia()
    .subscribe(data => {
      this.title = 'Turnos Por dia';
      this.crearChart(data);
    });
  }

  medicosPorDia = () => {
    this.turnoService.obtenerMedicosPorDia()
    .subscribe(data => {
      this.title = 'Medicos Por dia';
      this.crearChart(data);
    });
  }

  medicosPorTurnos = () => {
    this.turnoService.obtenerMedicosPorTurnos();
  }

}
