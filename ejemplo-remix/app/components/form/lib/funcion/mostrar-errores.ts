import type {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";

export function MostrarErrores(error: any, field, campoFormulario: CampoFormularioInterface) {
    console.log(campoFormulario, error, field);
    let mensajeError = '';
    if (error && field) {
        if (error[field.name]) {
            switch (error[field.name].type) {
                case 'required':
                    mensajeError += `Requerido, el campo es requerido\n`;
                    break;
                case 'minLength':
                    if (campoFormulario.validators.minLength) {
                        mensajeError += `Tamano minimo, ${campoFormulario.validators.minLength.value}\n`;
                    }
                    break;
                case 'maxLength':
                    if (campoFormulario.validators.maxLength) {
                        mensajeError += `Tamano maximo, ${campoFormulario.validators.maxLength.value}\n`;
                    }
                    break;
                case 'pattern':
                    if (campoFormulario.validators.pattern) {
                        mensajeError += `Valor erroneo, ${campoFormulario.validators.pattern.mensaje}\n`;
                    }
                    break;
                default:
                    mensajeError += `Error, ${error[field.name].message}\n`;
            }
        }
    }
    return mensajeError;
}