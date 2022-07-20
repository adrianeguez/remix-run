import {TipoArchivoEnum} from "~/enum/tipo-archivo.enum";
import {SisHabilitadoEnum} from "~/enum/sis-habilitado.enum";

export interface NuevoArchivoInterface {
    id: number;
    nombreIdentificador: string;
    tipo: TipoArchivoEnum;
    nombre?: string;
    descripcion?: string;
    file: File;
    sisHabilitado: SisHabilitadoEnum;
}