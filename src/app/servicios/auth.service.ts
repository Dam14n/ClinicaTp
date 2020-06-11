import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuariosCollectionRef: AngularFirestoreCollection<Usuario>;
  usuarios: Observable<Usuario[]>;

  constructor(private firestore: AngularFirestore) {
    this.usuariosCollectionRef = this.firestore.collection<Usuario>('usuarios');
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

  public login(nombre: string, clave: string, onLogin: Function, onLoginError: Function) {
    this.usuarios.subscribe(usuarios => {
      const user = usuarios.find(unUsuario => unUsuario.nombre === nombre && unUsuario.clave === clave);
      if (user) {
        localStorage.setItem('usuario', JSON.stringify(user));
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
}
