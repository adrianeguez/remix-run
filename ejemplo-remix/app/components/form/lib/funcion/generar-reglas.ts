import {CampoFormularioType} from "~/components/form/lib/enum/campo-formulario.type";
import {ValidarTamanoInputFile} from "~/functions/form/validar-tamano-input-file";

export function GenerarReglas(campoFormulario) {
    const reglas: any = {};
    if (campoFormulario.validators) {
        if (campoFormulario.validators.required && campoFormulario.type !== CampoFormularioType.Number) {
            reglas['required'] = typeof campoFormulario.validators.required === 'string' ? campoFormulario.validators.required : 'Error'
        }
        if (campoFormulario.validators.minLength) {
            reglas['minLength'] = {
                value: campoFormulario.validators.minLength.value,
                message: campoFormulario.validators.minLength.mensaje
            }
        }
        if (campoFormulario.validators.maxLength) {
            reglas['maxLength'] = {
                value: campoFormulario.validators.maxLength.value,
                message: campoFormulario.validators.maxLength.mensaje
            }
        }
        if (campoFormulario.validators.max) {
            reglas['max'] = campoFormulario.validators.max.value
            reglas['validate'] = {
                ...reglas['validate'],
                maxValidateFn: campoFormulario.validators.max.validationFn
            };
            reglas['valueAsNumber'] = true;
        }
        if (campoFormulario.validators.min) {
            reglas['min'] = campoFormulario.validators.min.value
            reglas['validate'] = {
                ...reglas['validate'],
                minValidateFn: campoFormulario.validators.min.validationFn
            };
            reglas['valueAsNumber'] = true;
        }
        if (campoFormulario.validators.pattern) {
            reglas['pattern'] = {
                value: campoFormulario.validators.pattern.pattern,
                message: campoFormulario.validators.pattern.mensaje
            }
        }
        if (campoFormulario.validators.url) {
            reglas['url'] = {
                message: campoFormulario.validators.url.mensaje
            }
        }
        if (campoFormulario.validators.email) {
            reglas['email'] = {
                message: campoFormulario.validators.email.mensaje
            }
        }
        if (campoFormulario.type === CampoFormularioType.Number) {
            reglas['valueAsNumber'] = true;
            if (campoFormulario.validators.required) {
                reglas['validate'] = {
                    ...reglas['validate'],
                    required: (valor) => {
                        return !Number.isNaN(+valor) && (+valor > 0 || +valor <= 0)
                    }
                };
            }
        }
        if (campoFormulario.type === CampoFormularioType.File) {
            if (campoFormulario.file) {
                reglas['validate'] = {
                    ...reglas['validate'],
                    tamanioMaximoEnBytes: (valor) => {
                        if(campoFormulario.file.tamanioMaximoEnBytes){
                            return ValidarTamanoInputFile(valor, campoFormulario.file.tamanioMaximoEnBytes);
                        }else{
                            return true;
                        }
                        // return !Number.isNaN(+valor) && (+valor > 0 || +valor <= 0)
                    }
                };
            }
        }
    }
    return reglas;
}