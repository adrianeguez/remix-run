import {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";
import {CampoFormularioType} from "~/components/form/lib/enum/campo-formulario.type";
import {ArchivoImagenEnum} from "~/enum/archivo-imagen.enum";
import {TipoArchivoEnum} from "~/enum/tipo-archivo.enum";
import AttachFileIcon from '@mui/icons-material/AttachFile';

export interface SubirArchivosImagenesFormInterface {
    tipoArchivo: TipoArchivoEnum;
    accept: string;
    tamanioMaximoEnBytes: number;
}

export function subirArchivosImagenesForm(configuracion: SubirArchivosImagenesFormInterface): CampoFormularioInterface[] {
    return [
        {
            formControlName: 'archivoImagen',
            help: `Sube un${configuracion.tipoArchivo === ArchivoImagenEnum.SisImagen ? 'a imagen' : ' archivo'}`,
            label: `${configuracion.tipoArchivo === ArchivoImagenEnum.SisImagen ? 'Imagen' : 'Archivo'}`,
            initialValue: '',
            actualValue: '',
            type: CampoFormularioType.File,
            valid: false,
            placeholder: `Ej: Selecciona un${configuracion.tipoArchivo === ArchivoImagenEnum.SisImagen ? 'a imagen' : ' archivo'}`,
            validators: {
                required: 'Requerido'
            },
            file: {
                tipoArchivo: configuracion.tipoArchivo,
                accept: configuracion.accept,
                tamanioMaximoEnBytes: configuracion.tamanioMaximoEnBytes // 0.45 MB
            },
            icon: <AttachFileIcon/>
        },
    ] as CampoFormularioInterface[]
}