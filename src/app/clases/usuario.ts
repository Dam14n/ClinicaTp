import { TipoUsuario } from '../enum/tipo-usuario.enum';

export interface Usuario {
    id: string,
    nombre: string,
    email: string,
    clave: string,
    tipo: TipoUsuario,
    estaAprobado: boolean
}
