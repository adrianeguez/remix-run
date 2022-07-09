import {CampoFormularioType} from "~/components/form/lib/enum/campo-formulario.type";
import {LibroBibliotecaEnum} from "~/http/libro-biblioteca/form/libro-biblioteca.enum";
import {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";
import {FiltroComunForm} from "~/http/comun/filtro-comun.form";

export function LibroBibliotecaFiltroForm(): CampoFormularioInterface[] {
    return [
        ...FiltroComunForm(),

        {
            formControlName: LibroBibliotecaEnum.Autocomplete,
            help: 'Seleccione un libro',
            label: 'Libro',
            initialValue: '',
            actualValue: '',
            type: CampoFormularioType.Autocomplete,
            valid: false,
            placeholder: 'EJ: Libro 1',
            validators: {
            },
            autocomplete: {
                nombrePropiedadObjeto: 'id'
            }
        },
    ]
}