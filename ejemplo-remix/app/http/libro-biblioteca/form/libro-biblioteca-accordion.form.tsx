import {
    CampoFormularioAccordeonInterface
} from "~/components/form/lib/interfaces/campo-formulario-accordeon.interface";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {LibroBibliotecaEnum} from "~/http/libro-biblioteca/form/libro-biblioteca.enum";
import {FormularioComunEnum} from "~/enum/formulario-comun.enum";

export function LibroBibliotecaAccordionForm(): CampoFormularioAccordeonInterface[] {
    return [
        {
            id: 'comunes',
            descripcion: 'Campos comunes',
            labelJSXElement: <p><SearchIcon className={'mr-2'}/>Comunes</p>,
            campos: [LibroBibliotecaEnum.Nombre, LibroBibliotecaEnum.Descripcion],
            camposFormulario: [],
            accordeonAbierto: true,
        },
        {
            id: 'fechas',
            descripcion: 'Campos especificos',
            labelJSXElement: (<p><CalendarMonthIcon className={'mr-2'}/>Fechas</p>),
            campos: [LibroBibliotecaEnum.ISBN, LibroBibliotecaEnum.GeneroLibro, FormularioComunEnum.SisHabilitado],
            camposFormulario: [],
            accordeonAbierto: true,
        },
    ];
}