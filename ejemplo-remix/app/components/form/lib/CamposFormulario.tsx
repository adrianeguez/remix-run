import {BlockTitle, Button, List, ListInput, useTheme} from "konsta/react";
import {useState} from "react";
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import {Form} from "@remix-run/react";
import {ActionFunction, redirect} from "@remix-run/node";
import {UseFormReturn} from "react-hook-form/dist/types";
import {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";

export default function CamposFormulario(props: { useFormReturn: UseFormReturn<any, any>, campos: CampoFormularioInterface[] }) {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
        control,
        setValue,
        reset,
        resetField
    } = props.useFormReturn;
    const mostrarErrores = (error: any, field, campoFormulario: CampoFormularioInterface) => {
        console.log('error', error, field)
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
                }
            }
        }
        return mensajeError;
    }
    const generarCampo = (campoFormulario: CampoFormularioInterface) => {
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
                reglas['max'] = {
                    value: campoFormulario.validators.max.value,
                    message: campoFormulario.validators.max.mensaje
                }
            }
            if (campoFormulario.validators.min) {
                reglas['min'] = {
                    value: campoFormulario.validators.min.value,
                    message: campoFormulario.validators.min.mensaje
                }
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
        console.log('reglas', reglas);
        return (
            <Controller
                key={campoFormulario.formControlName}
                name={campoFormulario.formControlName as any}
                control={control as any}
                rules={reglas}
                render={({field}) =>
                {
                    // IF mobile => xxxx
                    // IF Web => xxxx
                    return (
                        <div>
                            <ListInput
                                label={campoFormulario.label + (campoFormulario.validators.required ? ' *' : '') + ':'}
                                type={campoFormulario.type}
                                name={campoFormulario.formControlName}
                                placeholder={campoFormulario.placeholder}
                                clearButton={true}
                                info={campoFormulario.help}
                                value={field.value}
                                error={mostrarErrores(errors, field, campoFormulario)}
                                media={<><img className={'icon-small'}
                                              src="https://cdn-icons-png.flaticon.com/512/16/16363.png"
                                              alt=""/></>}
                                onChange={field.onChange}
                                onClear={() => {
                                    console.log(campoFormulario)
                                    setValue(campoFormulario.formControlName, '', {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                        shouldTouch: true
                                    })
                                }}
                            />
                        </div> as any
                    )
                }
                }
            />)
    }
    console.log(watch("nombre"));
    return (
        <>
            {props.campos.map((f) => generarCampo(f))}
        </>
    );
}