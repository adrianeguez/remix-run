import {AccordeonFiltroComunForm} from "~/http/comun/accordeon-filtro-comun.form";
import {CampoFormularioAccordeonInterface} from "~/components/form/lib/interfaces/campo-formulario-accordeon.interface";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {FiltrosComunesEnum} from "~/enum/filtros-comunes.enum";
import {LibroBibliotecaEnum} from "~/http/libro-biblioteca/form/libro-biblioteca.enum";

export function LibroBibliotecaFiltroAccordionForm(): CampoFormularioAccordeonInterface[] {
    return [
        ...AccordeonFiltroComunForm(),
        {
            id: 'huevov',
            descripcion: 'Autocomplete',
            labelJSXElement: (<p><CalendarMonthIcon className={'mr-2'}/>Autocomplete</p>),
            campos: [LibroBibliotecaEnum.Autocomplete],
            camposFormulario: [],
        }
    ]
}