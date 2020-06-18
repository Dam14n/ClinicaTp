import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { map, reduce, filter } from 'rxjs/operators';
import { Turno } from '../clases/turno';
import { Usuario } from '../clases/usuario';
import { DIAS_DE_LA_SEMANA } from '../enum/dias-de-la-semana.enum';
import { TipoUsuario } from '../enum/tipo-usuario.enum';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(private firestore: AngularFirestore) { }

  pedirTurno(turno: Turno) {
    turno.id = this.firestore.createId();
    this.firestore.collection<Turno>('turnos').add(turno);
  }

  obtenerTurnosParaUsuario(usuario: Usuario) {
    switch (usuario.tipo) {
      case TipoUsuario.PROFESIONAL:
        return this.obtenerTurnoPara('profesional', usuario);
      case TipoUsuario.PACIENTE:
        return this.obtenerTurnoPara('paciente', usuario);
      case TipoUsuario.ADMIN:
        return this.firestore.collection<Turno>('turnos').valueChanges()
    }
  }

  private obtenerTurnoPara = (tipo: string, usuario: Usuario) =>
    this.firestore.collection<Turno>('turnos', ref =>
      ref.where(tipo + '.id', '==', usuario.id))
      .valueChanges()

  actualizarTurno = (turno: Turno) => {
    this.firestore.collection('turnos').doc(turno.id).set(turno);
  }

  obtenerTurnoPorId = (id: string) => {
    return this.firestore.collection<Turno>('turnos', ref => ref.where('id', '==', id)).valueChanges();
  }

  obtenerMedicosPorTurnos() {
    return this.firestore.collection<Turno>('turnos')
      .get()
      .switchMap(docs => of(...docs.docs))
      .pipe(map(doc => doc.data() as Turno))
      .pipe(reduce((series, turno) => {
        let profesional = turno.profesional;
        let serie = series.find(serie => serie.name === profesional.nombre) || this.crearNuevaSeriePara(series, profesional.nombre);
        serie.data.length ? serie.data[0] = serie.data[0] + 1 : serie.data.push(1);
        return series;
      }, []))
  }

  obtenerMedicosPorDia() {
    return this.firestore.collection<Turno>('turnos')
      .get()
      .switchMap(docs => of(...docs.docs))
      .pipe(map(doc => doc.data() as Turno))
      .pipe(reduce((series, turno) => {
        let dia = DIAS_DE_LA_SEMANA[turno.dia.toDate().getDay() - 1];
        let serie = series.find(serie => serie.name === dia) || this.crearNuevaSeriePara(series, dia);
        serie.data.push(turno.profesional.id);
        return series;
      }, []))
      .pipe(map(series => {
        series.forEach(serie => serie.data = [new Set(serie.data).size])
        return series;
      }
      ));
  }

  obtenerTurnosPorDia() {
    return this.firestore.collection<Turno>('turnos')
      .get()
      .switchMap(docs => of(...docs.docs))
      .pipe(map(doc => doc.data() as Turno))
      .pipe(reduce((series, turno) => {
        let dia = DIAS_DE_LA_SEMANA[turno.dia.toDate().getDay() - 1];
        let serie = series.find(serie => serie.name === dia) || this.crearNuevaSeriePara(series, dia);
        serie.data.length ? serie.data[0] = serie.data[0] + 1 : serie.data.push(1);
        return series;
      }, []))
  }

  private crearNuevaSeriePara(series: any[], nombre: string) {
    let serie = {
      name: nombre,
      data: [],
      type: undefined
    };
    series.push(serie);
    return serie;
  }

  obtenerTurnosPorEspecialidad() {
    return this.firestore.collection<Turno>('turnos')
      .get()
      .switchMap(docs => of(...docs.docs))
      .pipe(map(doc => doc.data() as Turno))
      .pipe(reduce((series, turno) => {
        let serie = series.find(serie => serie.name === turno.especialidad) || this.crearNuevaSeriePara(series, turno.especialidad);
        serie.data.length ? serie.data[0] = serie.data[0] + 1 : serie.data.push(1);
        return series;
      }, []));
  }

  filtrarTurnos(busqueda: string) {
    return this.firestore.collection<Turno>('turnos')
      .get()
      .switchMap(docs => of(...docs.docs))
      .pipe(map(doc => doc.data() as Turno))
      .pipe(filter(turno => JSON.stringify(turno).toLowerCase().includes(busqueda.toLowerCase())));
  }

}
