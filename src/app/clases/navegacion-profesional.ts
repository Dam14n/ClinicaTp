import { Navegacion } from './navegacion';

export class NavegacionProfesional implements Navegacion {
    puedeNavegar = (link: string) => false;
}
