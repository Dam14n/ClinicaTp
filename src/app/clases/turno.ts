import { firestore } from 'firebase';
import { Profesional } from './profesional';
import { Usuario } from './usuario';
import { TurnoEstado } from './turno-estado.enum';
import { Especialidad } from './especialidad';

export interface Turno {
    id?: string,
    profesional: Profesional,
    paciente: Usuario,
    creacion: firestore.Timestamp,
    dia: firestore.Timestamp,
    horario: string,
    comentarioPaciente?: string,
    encuesta?: string,
    comentarioProfesional?: string,
    estado: TurnoEstado,
    informacionExtra?: any,
    especialidad: string
}
