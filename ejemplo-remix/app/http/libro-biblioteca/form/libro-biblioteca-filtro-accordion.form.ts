import {AccordeonFiltroComunForm} from "~/http/comun/accordeon-filtro-comun.form";
import {CampoFormularioAccordeonInterface} from "~/components/form/lib/interfaces/campo-formulario-accordeon.interface";

export function LibroBibliotecaFiltroAccordionForm(): CampoFormularioAccordeonInterface[]{
    return [
        ...AccordeonFiltroComunForm()
    ]
}