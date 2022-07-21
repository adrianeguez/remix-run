import {TipoArchivoEnum} from "~/enum/tipo-archivo.enum";

export interface ComunHttpInterface {
    sisCreado?: string;
    sisModificado?: string;
    sisHabilitado?: number;
    id?: number;
    key?: number;
    sisArchivo?: SisArchivoInterface;
    sisImagen?: SisArchivoInterface;
}

export interface SisArchivoInterface {
    buffer: string;
    descripcion?: string;
    id: number
    idReferencial: number
    mimetype: string;
    nombre?: string;
    nombreIdentificador: string;
    originalname: string;
    size: number;
    tipo: TipoArchivoEnum
}
