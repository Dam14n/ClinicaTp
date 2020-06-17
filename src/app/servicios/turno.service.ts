import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Turno } from '../clases/turno';
import { Usuario } from '../clases/usuario';
import { TipoUsuario } from '../enum/tipo-usuario.enum';
import { ActivatedRoute } from '@angular/router';

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
    return usuario.tipo === TipoUsuario.PROFESIONAL ? this.obtenerTurnoPara('profesional', usuario) : this.obtenerTurnoPara('paciente', usuario);
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

}
