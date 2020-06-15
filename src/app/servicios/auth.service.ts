import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { PageEvent } from '@angular/material/paginator';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../clases/usuario';

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
    const usuario = localStorage.getItem('clinicaCredentials');
    return usuario !== null && usuario !== undefined;
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
        return { ...user.data() } as Usuario
      }));
  }

  public login(nombre: string, clave: string, onLogin: Function, onLoginError: Function) {
    this.angularFirestore.collection<Usuario>('usuarios',
      ref => ref
        .where('nombre', '==', nombre)
        .where('clave', '==', clave)
        .where('estaAprobado', '==', true)
    )
      .valueChanges()
      .subscribe(usuarios => {
        if (usuarios.length === 1) {
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

  public aprobarUsuario(usuario: Usuario) {
    this.usuariosCollectionRef.doc(usuario.id).set(usuario);
  }

}
