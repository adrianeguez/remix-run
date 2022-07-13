import {TipoArchivoEnum} from "~/enum/tipo-archivo.enum";

export interface CampoFormularioFileInterface {
    tipoArchivo: TipoArchivoEnum;
    accept: string;
    tamanioMaximoEnBytes: number;
}