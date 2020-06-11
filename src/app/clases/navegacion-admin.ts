import { Navegacion } from './navegacion';

export class NavegacionAdmin implements Navegacion{
    puedeNavegar = (link: string) => true;
}
