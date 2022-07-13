import {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";
import {FiltroComunForm} from "~/http/comun/filtro-comun.form";

export function LibroBibliotecaFiltroForm(): CampoFormularioInterface[] {
    return [
        ...FiltroComunForm(),
    ]
}