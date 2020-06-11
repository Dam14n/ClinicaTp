import { Usuario } from './usuario';

export interface Profesional extends Usuario {
    especialidades: Array<string>
}
