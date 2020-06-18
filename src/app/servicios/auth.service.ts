import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { PageEvent } from '@angular/material/paginator';
import { firestore } from 'firebase';
import { Observable, of } from 'rxjs';
import { map, reduce } from 'rxjs/operators';
import { Profesional } from '../clases/profesional';
import { Usuario } from '../clases/usuario';
import { Especialidad } from '../clases/especialidad';
import { DateFormatPipe } from '../pipe/date-format.pipe';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuariosCollectionRef: AngularFirestoreCollection<Usuario>;
  usuarios: Observable<Usuario[]>;

  constructor(private angularFirestore: AngularFirestore, private dateFormat: DateFormatPipe) {
    this.usuariosCollectionRef = this.angularFirestore.collection<Usuario>('usuarios');
    this.usuarios = this.usuariosCollectionRef.valueChanges();
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


  // TODO fix pagination
  public obtenerUsuarios = (pageEvent: PageEvent, lastDoc) => {
    let query = this.usuariosCollectionRef.ref
      .orderBy('creation', 'desc')
      .limit(pageEvent.pageSize + (pageEvent.pageIndex * pageEvent.pageSize));
    if (lastDoc) {
      const date = lastDoc.creation as firestore.Timestamp;
      query.where('creation', '>=', date.toDate());
    }
    return query.get().then(
      querySnapshots => querySnapshots.docs.map<Usuario>(user => {
        return { id: user.id, ...user.data() } as Usuario
      }));
  }

  public login(nombre: string, clave: string, onLogin: Function, onLoginError: Function) {
    this.usuariosCollectionRef.ref
      .where('nombre', '==', nombre)
      .where('clave', '==', clave)
      .where('estaAprobado', '==', true)
      .get()
      .then(
        querySnapshots => {
          const usuarios = querySnapshots.docs.map<Usuario>(user => {
            return { id: user.id, ...user.data() } as Usuario
          });
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
    usuario.id = this.angularFirestore.createId();
    this.usuariosCollectionRef.doc(usuario.id).set(usuario);
  }

  // TODO mover a usuario service (refactorizar codigo de este servicio)
  public obtenerUsuarioActual() {
    let usuario = JSON.parse(localStorage.getItem('clinicaCredentials'));
    return this.usuariosCollectionRef
      .doc(usuario.id)
      .get()
      .pipe(map(doc => doc.data() as Usuario));
  }

  public obtenerUsuarioActualFromLocal() {
    let usuario = JSON.parse(localStorage.getItem('clinicaCredentials'));
    return usuario;
  }

  public actualizarUsuario(usuario: Usuario) {
    this.usuariosCollectionRef.doc(usuario.id).set(usuario);
  }

  public obtenerProfesionalesAprobadosPorEspecialidad = (especialidad: Especialidad) => {
    return this.usuariosCollectionRef.ref
      .where('tipo', '==', 2)
      .where('estaAprobado', '==', true)
      .where('especialidades', 'array-contains', especialidad.nombre)
      .where('estaConfigurado', '==', true)
      .get().then(
        querySnapshots => querySnapshots.docs.map<Profesional>(user => {
          return { id: user.id, ...user.data() } as Profesional
        }));
  }

  usuarioYaExiste = (usuario: Usuario, onSuccess: Function, onError: Function) => {
    const ref = this.usuariosCollectionRef.ref;
    ref.where('nombre', '==', usuario.nombre)
      .where('clave', '==', usuario.clave)
      .get()
      .then(
        querySnapshots => {
          querySnapshots.docs.length ? onSuccess() : onError();
        })
  }

  obtenerProfesionalesRegistradosPorHorario() {
    return this.angularFirestore.collection<Profesional>('usuarios',
      ref => ref.where('tipo', '==', 2))
      .get()
      .switchMap(docs => of(...docs.docs))
      .pipe(map(doc => doc.data() as Profesional))
      .pipe(reduce((series, profesional) => {
        let dia = this.dateFormat.transform((profesional.creation as firestore.Timestamp).toDate(), "h/MM/ss");
        let serie = series.find(serie => serie.name === dia) || this.crearNuevaSeriePara(series, dia);
        serie.data.length ? serie.data[0] = serie.data[0] + 1 : serie.data.push(1);
        return series;
      }, []))
  }

  obtenerProfesionalesRegistradosPorDia() {
    return this.angularFirestore.collection<Profesional>('usuarios',
      ref => ref.where('tipo', '==', 2))
      .get()
      .switchMap(docs => of(...docs.docs))
      .pipe(map(doc => doc.data() as Profesional))
      .pipe(reduce((series, profesional) => {
        let dia = this.dateFormat.transform(profesional.creation.toDate(), "MM/dd/yyyy");
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

}