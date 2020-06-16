import { firestore } from 'firebase';
import { Profesional } from './profesional';
import { Usuario } from './usuario';

export interface Turno {
    id: string,
    profesional: Profesional,
    paciente: Usuario,
    creacion: firestore.Timestamp,
    fechaTurno: firestore.Timestamp,
    comentarioPaciente: string,
    encuesta: string,
    comentarioProfesional: string
}
