import { Profesional } from './profesional';
import { Paciente } from './paciente';
import { firestore } from 'firebase';

export interface Turno {
    id: string,
    profesional: Profesional,
    paciente: Paciente,
    creacion: firestore.Timestamp,
    actualizado: firestore.Timestamp,
    comentarioPaciente: string,
    encuesta: string,
    comentarioProfesional: string    
}
