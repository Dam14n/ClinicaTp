import { TipoUsuario } from '../enum/tipo-usuario.enum';

export interface Usuario {
    id: number,
    nombre: string,
    email: string,
    clave: string,
    tipo: TipoUsuario
}
