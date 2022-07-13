import {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";
import {CampoFormularioType} from "~/components/form/lib/enum/campo-formulario.type";
import {FiltrosComunesEnum} from "~/enum/filtros-comunes.enum";
import {SisHabilitadoEnum} from "~/enum/sis-habilitado.enum";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {ArchivoImagenEnum} from "~/enum/archivo-imagen.enum";
import {TipoArchivoEnum} from "~/enum/tipo-archivo.enum";
import AttachFileIcon from '@mui/icons-material/AttachFile';
export function FiltroComunForm(): CampoFormularioInterface[] {
    return [
        {
            formControlName: FiltrosComunesEnum.Busqueda,
            help: 'Busque por id',
            label: 'Busqueda',
            initialValue: '',
            actualValue: '',
            type: CampoFormularioType.Text,
            valid: false,
            placeholder: 'EJ: 1...',
            icon: <ManageSearchIcon/>,
            validators: {}
        },
        {
            formControlName: FiltrosComunesEnum.SisHabilitado,
            help: 'Filtro por habilitado',
            label: 'Habilitado',
            initialValue: '',
            actualValue: '',
            type: CampoFormularioType.Select,
            valid: false,
            placeholder: 'Seleccione uno',
            validators: {},
            select: {
                opciones: [
                    {
                        id: '',
                        value: '',
                        label: 'Todos'
                    },
                    {
                        id: SisHabilitadoEnum.Activo,
                        value: SisHabilitadoEnum.Activo,
                        label: 'Habilitado'
                    },
                    {
                        id: SisHabilitadoEnum.Inactivo,
                        value: SisHabilitadoEnum.Inactivo,
                        label: 'Deshabilitado'
                    }
                ]
            },
            icon: <DoDisturbIcon/>
        },
        {
            formControlName: FiltrosComunesEnum.SisCreado,
            help: 'Filtro por fecha creacion',
            label: 'F. Creacion',
            initialValue: '',
            actualValue: '',
            type: CampoFormularioType.Date,
            valid: false,
            placeholder: 'Ej: 22/05/2000',
            validators: {},
            icon: <CalendarTodayIcon/>
        },
        {
            formControlName: FiltrosComunesEnum.SisModificado,
            help: 'Filtro por fecha modificacion',
            label: 'F. Modificacion',
            initialValue: '',
            actualValue: '',
            type: CampoFormularioType.Date,
            valid: false,
            placeholder: 'Ej: 22/05/2000',
            validators: {},
            icon: <CalendarTodayIcon/>
        },
        {
            formControlName: ArchivoImagenEnum.SisArchivo,
            help: 'Sube un archivo',
            label: 'Archivo',
            initialValue: '',
            actualValue: '',
            type: CampoFormularioType.File,
            valid: false,
            placeholder: 'Ej: Selecciona un archivo',
            validators: {},
            file:{
                tipoArchivo: TipoArchivoEnum.Imagen,
                accept: '',
                tamanioMaximoEnBytes: 1000 * 1000 * 0.45 // MB
            },
            icon: <AttachFileIcon/>
        },
    ] as CampoFormularioInterface[]
}