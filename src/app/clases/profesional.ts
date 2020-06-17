import { DIAS_DE_LA_SEMANA } from '../enum/dias-de-la-semana.enum';
import { Usuario } from './usuario';

export interface Profesional extends Usuario {
    especialidades: Array<string>,
    dias: DIAS_DE_LA_SEMANA[],
    desde: number,
    hasta: number
}
