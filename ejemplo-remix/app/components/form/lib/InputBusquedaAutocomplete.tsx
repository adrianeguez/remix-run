import {CampoFormularioType} from "~/components/form/lib/enum/campo-formulario.type";
import {Controller} from "react-hook-form";
import {GenerarReglas} from "~/components/form/lib/funcion/generar-reglas";
import {MostrarErrores} from "~/components/form/lib/funcion/mostrar-errores";
import {useState} from "react";
import {ListInput} from "konsta/react";
import {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";

export const InputBusquedaAutocomplete = ({useFormAutocomplete}) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
        control,
        setValue,
        reset,
        resetField
    } = useFormAutocomplete;
    const [campoFormulario, setCampoFormulario] = useState({
        formControlName: 'busqueda',
        help: 'Busque un registro',
        label: 'Busqueda',
        initialValue: '',
        actualValue: '',
        type: CampoFormularioType.Text,
        valid: false,
        placeholder: 'EJ: ...',
        validators: {
            // no validaciones
        }
    } as CampoFormularioInterface)
    console.log(campoFormulario);
    if (Object.keys(campoFormulario).length > 0) {
        let reglas: any = GenerarReglas(campoFormulario);
        return (
            <Controller
                key={campoFormulario.formControlName}
                name={campoFormulario.formControlName as any}
                control={control as any}
                rules={reglas}
                render={({field}) => {
                    // IF mobile => xxxx
                    // IF Web => xxxx
                    return (
                        <div>
                            <ListInput
                                label={campoFormulario.label + (campoFormulario.validators.required ? ' *' : '') + ':'}
                                type={campoFormulario.type}
                                name={campoFormulario.formControlName}
                                placeholder={campoFormulario.placeholder}
                                info={campoFormulario.help}
                                step={(campoFormulario.type === CampoFormularioType.Number && campoFormulario.number) ? campoFormulario.number.step : ''}
                                value={campoFormulario.type === CampoFormularioType.Number ? +field.value : field.value}
                                error={MostrarErrores(errors, field, campoFormulario)}
                                media={<><img className={'icon-small'}
                                              src="https://cdn-icons-png.flaticon.com/512/16/16363.png"
                                              alt=""/></>}
                                onChange={field.onChange}
                                clearButton={true}
                                onClear={() => {
                                    setValue(campoFormulario.formControlName, '', {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                        shouldTouch: true
                                    })
                                }}
                            >
                            </ListInput>
                        </div> as any
                    )
                }
                }
            />
        )
    } else {
        return (<></>);
    }
}