import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Turno } from '../clases/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {


  constructor(private firestore: AngularFirestore) { }

  pedirTurno(turno: Turno) {
    this.firestore.collection<Turno>('turnos').add(turno);
  }

}
