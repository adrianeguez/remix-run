export function GenerarReglas(campoFormulario) {
    let reglas: any = {};
    if (campoFormulario.validators) {
        if (campoFormulario.validators.required) {
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
    }
    return reglas;
}