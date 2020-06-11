import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface Especialidad {
  id: number;
  nombre: string;
}

const ESPECIALIDADES: Especialidad[] = [
  { id: 1, nombre: 'Hydrogen' },
  { id: 2, nombre: 'Helium' },
  { id: 3, nombre: 'Lithium' }
];

@Component({
  selector: 'app-registro-profesional',
  templateUrl: './registro-profesional.component.html',
  styleUrls: ['./registro-profesional.component.css']
})
export class RegistroProfesionalComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'quitar'];
  especialidadesForm = new FormControl();
  especialidades: Especialidad[] = ESPECIALIDADES;
  especialidadesElegidas: Array<Especialidad>;
  selectSelections: any[];

  constructor() {
  }

  ngOnInit() {
    this.especialidadesElegidas = new Array<Especialidad>();
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

  onQuitarEspecialidad(especialidad: Especialidad){
    const indexSelect = this.selectSelections.indexOf(especialidad.nombre);
    this.selectSelections.splice(indexSelect, 1);
    this.selectSelections = new Array<any>(...this.selectSelections);

    const index = this.especialidadesElegidas.indexOf(especialidad);
    this.especialidadesElegidas.splice(index, 1);
    this.especialidadesElegidas = new Array<Especialidad>(...this.especialidadesElegidas);
  }

}
