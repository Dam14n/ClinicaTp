import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Especialidad } from 'src/app/clases/especialidad';
import { EspecialidadService } from 'src/app/servicios/especialidad.service';

@Component({
  selector: 'app-registro-profesional',
  templateUrl: './registro-profesional.component.html',
  styleUrls: ['./registro-profesional.component.css']
})
export class RegistroProfesionalComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'quitar'];
  especialidadesForm = new FormControl();
  especialidades: Especialidad[];
  especialidadesElegidas: Array<Especialidad>;
  selectSelections: any[];
  especialidadNueva: string;

  constructor(private especialidadService: EspecialidadService) {
  }

  ngOnInit() {
    this.especialidadesElegidas = new Array<Especialidad>();
    this.especialidadService.obtenerEspecialidades().subscribe(espec => this.especialidades = espec);
  }

  onSeleccionarEspecialidad(especialidad: Especialidad) {
    if (!this.especialidadesElegidas.find(e => e.id === especialidad.id)) {
      this.especialidadesElegidas.push(especialidad);
    } else {
      const index = this.especialidadesElegidas.indexOf(especialidad);
      this.especialidadesElegidas.splice(index, 1);
    }
    this.especialidadesElegidas = new Array<Especialidad>(...this.especialidadesElegidas);
  }

  onQuitarEspecialidad(especialidad: Especialidad) {
    const indexSelect = this.selectSelections.indexOf(especialidad.nombre);
    this.selectSelections.splice(indexSelect, 1);
    this.selectSelections = new Array<any>(...this.selectSelections);

    const index = this.especialidadesElegidas.indexOf(especialidad);
    this.especialidadesElegidas.splice(index, 1);
    this.especialidadesElegidas = new Array<Especialidad>(...this.especialidadesElegidas);
  }

  agregarNuevaEspecialidad = () => {
    const especialidadNuev: Especialidad = { id: undefined, nombre: this.especialidadNueva };
    this.especialidadService.guardarEspecialidad(especialidadNuev);
    this.especialidadNueva = '';
  }

}
