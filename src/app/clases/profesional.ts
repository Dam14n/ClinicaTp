import { DAYS_OF_WEEK } from 'angular-calendar';
import { Usuario } from './usuario';

export interface Profesional extends Usuario {
    especialidades: Array<string>,
    dias: DAYS_OF_WEEK[],
    desde: number,
    hasta: number
}
