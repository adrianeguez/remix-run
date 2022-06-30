import {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";
import {CampoFormularioType} from "~/components/form/lib/enum/campo-formulario.type";

export function GenerateDefaultValues(campos: CampoFormularioInterface[]) {
    const defaultValuesObject: any = {};
    campos.forEach(
        (campo) => {
            if (campo.type === CampoFormularioType.Autocomplete && campo.autocomplete) {
                if (typeof campo.initialValue === 'object' && !Array.isArray(campo.initialValue)) {
                    defaultValuesObject[campo.formControlName] = campo.initialValue[campo.autocomplete.nombrePropiedadObjeto];
                } else {
                    defaultValuesObject[campo.formControlName] = campo.initialValue;
                }
            } else {
                defaultValuesObject[campo.formControlName] = campo.initialValue;
            }
        }
    )
    return defaultValuesObject
}