import { Navegacion } from './navegacion';

export class NavegacionAdmin implements Navegacion{
    puedeNavegarA: Array<string> = ['Configuracion'];

    puedeNavegar = (link: string) => !this.puedeNavegarA.some( l => l === link);

}
