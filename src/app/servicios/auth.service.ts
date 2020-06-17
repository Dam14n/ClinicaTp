import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { PageEvent } from '@angular/material/paginator';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profesional } from '../clases/profesional';
import { Usuario } from '../clases/usuario';
import { Especialidad } from '../clases/especialidad';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuariosCollectionRef: AngularFirestoreCollection<Usuario>;
  usuarios: Observable<Usuario[]>;

  constructor(private angularFirestore: AngularFirestore) {
    this.usuariosCollectionRef = this.angularFirestore.collection<Usuario>('usuarios');
    this.usuarios = this.usuariosCollectionRef.snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  public isAuthenticated(): boolean {
    const usuario = JSON.parse(localStorage.getItem('clinicaCredentials')) as Usuario;
    const isAuthenticated = usuario !== null && usuario !== undefined;
    if (isAuthenticated) {
      this.login(usuario.nombre, usuario.clave, () => { }, () => { });
    }
    return isAuthenticated;
  }

  public obtenerTotalUsuarios = () =>
    this.usuariosCollectionRef.ref.get().then(snap => snap.size);


  public obtenerUsuarios = (pageEvent: PageEvent, lastDoc) => {
    let query = this.usuariosCollectionRef.ref
      .orderBy('creation', 'desc')
      .limit(pageEvent.pageSize + (pageEvent.pageIndex * pageEvent.pageSize));
    if (lastDoc) {
      query.startAfter(lastDoc.creation as firestore.Timestamp);
    }
    return query.get().then(
      querySnapshots => querySnapshots.docs.map<Usuario>(user => {
        return { id: user.id, ...user.data() } as Usuario
      }));
  }

  public login(nombre: string, clave: string, onLogin: Function, onLoginError: Function) {
    let subsc = this.angularFirestore.collection<Usuario>('usuarios',
      ref => ref
        .where('nombre', '==', nombre)
        .where('clave', '==', clave)
        .where('estaAprobado', '==', true)
    )
      .valueChanges()
      .subscribe(usuarios => {
        // TODO handle users with same name and pass
        if (usuarios[0]) {
          localStorage.setItem('clinicaCredentials', JSON.stringify(usuarios[0]));
          onLogin();
        } else {
          onLoginError();
        }
      });
  }

  public logout() {
    localStorage.removeItem('clinicaCredentials');
  }

  public registrarUsuario(usuario: Usuario) {
    delete usuario.id;
    this.usuariosCollectionRef.add({ ...usuario });
  }

  // TODO mover a usuario service (refactorizar codigo de este servicio)
  public obtenerUsuarioActual(): Usuario {
    return JSON.parse(localStorage.getItem('clinicaCredentials'));
  }

  public actualizarUsuario(usuario: Usuario) {
    this.usuariosCollectionRef.doc(usuario.id).set(usuario);
  }

  public obtenerProfesionalesAprobadosPorEspecialidad = (especialidad: Especialidad) => {
    return this.usuariosCollectionRef.ref
      .where('tipo', '==', 2)
      .where('estaAprobado', '==', true)
      .where('especialidades', 'array-contains', especialidad.nombre)
      .get().then(
        querySnapshots => querySnapshots.docs.map<Profesional>(user => {
          return { id: user.id, ...user.data() } as Profesional
        }));
  }

}
