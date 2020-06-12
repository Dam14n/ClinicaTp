import { Navegacion } from './navegacion';

export class NavegacionProfesional implements Navegacion {
    puedeNavegarA: Array<string> = ['Turnos'];

    puedeNavegar = (link: string) => this.puedeNavegarA.some( l => l === link);
}
