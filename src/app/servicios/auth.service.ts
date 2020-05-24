import { Injectable } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuariosCollectionRef: AngularFirestoreCollection<Usuario>;
  usuarios: Observable<Usuario[]>;

  constructor(private firestore: AngularFirestore) {
    this.usuariosCollectionRef = this.firestore.collection<Usuario>('usuarios');
    this.usuarios = this.usuariosCollectionRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  public isAuthenticated(): boolean {
    const usuario = localStorage.getItem('usuario');
    return usuario !== null && usuario !== undefined;
  }

  public login(usuario: string, clave: string, onLogin: Function, onLoginError: Function) {
    this.usuarios.subscribe(usuarios => {
      const user = usuarios.find(unUsuario => unUsuario.usuario === usuario && unUsuario.clave === clave);
      if (user) {
        localStorage.setItem('usuario', JSON.stringify(user));
        onLogin();
      } else {
        onLoginError();
      }
    });
  }

  public logout() {
    localStorage.removeItem('usuario');
  }

  public registrarUsuario(usuario: string, clave: string) {
    const nuevoUsuario = new Usuario(usuario, clave);
    this.usuariosCollectionRef.add({ ...nuevoUsuario });
  }

  // TODO mover a usuario service (refactorizar codigo de este servicio)
  public obtenerUsuarioActual(): Usuario {
    return JSON.parse(localStorage.getItem('usuario'));
  }
}
