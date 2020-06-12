import { Navegacion } from './navegacion';

export class NavegacionPaciente implements Navegacion {
    puedeNavegarA: Array<string> = ['Turnos', 'Turnos/Cargar'];

    puedeNavegar = (link: string) => this.puedeNavegarA.some( l => l === link);

}
