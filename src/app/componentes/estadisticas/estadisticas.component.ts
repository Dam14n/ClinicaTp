import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { TurnoService } from 'src/app/servicios/turno.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { reduce } from 'rxjs/operators';
import { DIAS_DE_LA_SEMANA } from 'src/app/enum/dias-de-la-semana.enum';
import { of } from 'rxjs';
import { ArchivoService } from 'src/app/servicios/archivo.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  tipoChart: string = 'column';
  title: string;
  chart: Chart;

  constructor(
    private turnoService: TurnoService,
    private usuarioService: AuthService,
    private archivoService: ArchivoService) { }

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
    this.usuarioService.obtenerProfesionalesRegistradosPorDia()
      .subscribe(data => {
        this.title = 'Profesionales registrados por dia';
        this.crearChart(data);
      });
  }

  profPorHorario = () => {
    this.usuarioService.obtenerProfesionalesRegistradosPorHorario()
      .subscribe(data => {
        this.title = 'Profesionales registrados por horario';
        this.crearChart(data);
      });
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
    this.turnoService.obtenerMedicosPorTurnos()
      .subscribe(data => {
        this.title = 'Medicos Por Turnos';
        this.crearChart(data);
      });
  }

  descargarExcel = () => {
    this.archivoService.exportarExcel(this.chart.ref.series.map(serie => { return { nombre: serie.name, valores: serie.dataMin } }), this.title);
  }

}
