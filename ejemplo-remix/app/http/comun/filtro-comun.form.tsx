import {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";
import {CampoFormularioType} from "~/components/form/lib/enum/campo-formulario.type";
import {FiltrosComunesEnum} from "~/enum/filtros-comunes.enum";
import {SisHabilitadoEnum} from "~/enum/sis-habilitado.enum";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

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
    ] as CampoFormularioInterface[]
}