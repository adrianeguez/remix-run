import {FiltrosComunesEnum} from "~/enum/filtros-comunes.enum";
import {CampoFormularioAccordeonInterface} from "~/components/form/lib/interfaces/campo-formulario-accordeon.interface";
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
export function AccordeonFiltroComunForm(): CampoFormularioAccordeonInterface[] {
    return [
        {
            id: 'comunes',
            descripcion: 'Busque los registros',
            labelJSXElement: <p><SearchIcon className={'mr-2'}/>Comunes</p>,
            campos: [FiltrosComunesEnum.Busqueda, FiltrosComunesEnum.SisHabilitado],
            camposFormulario: [],
        },
        {
            id: 'fechas',
            descripcion: 'Seleccione una fecha en especifico',
            labelJSXElement: (<p><CalendarMonthIcon className={'mr-2'}/>Fechas</p>),
            campos: [FiltrosComunesEnum.SisCreado, FiltrosComunesEnum.SisModificado],
            camposFormulario: [],
        },
    ];
}