import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Especialidad } from '../clases/especialidad';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private especialidadesCollectionRef: AngularFirestoreCollection<any>;
  private especialidades: Observable<Array<any>>;
  private especialidadesList: Array<Especialidad>;

  constructor(private firestore: AngularFirestore) {
    this.especialidadesCollectionRef = this.firestore.collection<Especialidad>('especialidades');
    this.especialidades = this.especialidadesCollectionRef.snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    }));
    this.especialidades.subscribe(esp => this.especialidadesList = esp);
  }

  public listar(): Array<Especialidad> {
    return this.especialidadesList;
  }

  public obtenerEspecialidades = (): Observable<Array<any>> => {
    return this.especialidades;
  }

  public guardarEspecialidad = (especialidad: Especialidad) => this.especialidadesCollectionRef.add({ nombre: especialidad.nombre });
  
}
