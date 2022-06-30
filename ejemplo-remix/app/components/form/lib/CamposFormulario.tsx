import {
    List,
    ListInput,
    ListItem, Toggle,
} from "konsta/react";
import {Controller} from "react-hook-form";
import type {UseFormReturn} from "react-hook-form/dist/types";
import type {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";
import {CampoFormularioType} from "~/components/form/lib/enum/campo-formulario.type";
import {motion} from "framer-motion";
import {useState} from "react";
import {GenerarReglas} from "~/components/form/lib/funcion/generar-reglas";
import {MostrarErrores} from "~/components/form/lib/funcion/mostrar-errores";
import {CampoFormularioComponentInterface} from "~/components/form/lib/interfaces/campo-formulario-component.interface";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Typography} from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import {CampoFormularioAccordeonInterface} from "~/components/form/lib/interfaces/campo-formulario-accordeon.interface";

export default function CamposFormulario(props: CampoFormularioComponentInterface) {

    const [autocompleteAbierto, setAutocompleteAbierto] = useState(false);
    const [eventoAutocomplete, setEventoAutocomplete] = useState({} as CampoFormularioInterface);
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
    const generarCampo = (campoFormulario: CampoFormularioInterface) => {
        const reglas: any = GenerarReglas(campoFormulario);
        const generarLabel = () => {
            return campoFormulario.label + (campoFormulario.validators.required ? ' *' : '') + ':'
        }
        const esCampoComun = campoFormulario.type === CampoFormularioType.Url ||
            campoFormulario.type === CampoFormularioType.Text ||
            campoFormulario.type === CampoFormularioType.Password ||
            campoFormulario.type === CampoFormularioType.Email ||
            campoFormulario.type === CampoFormularioType.Tel ||
            campoFormulario.type === CampoFormularioType.Date ||
            campoFormulario.type === CampoFormularioType.DateTime ||
            campoFormulario.type === CampoFormularioType.Textarea ||
            campoFormulario.type === CampoFormularioType.Select ||
            campoFormulario.type === CampoFormularioType.Number
        if (esCampoComun) {
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
                                    clearButton={(campoFormulario.type === CampoFormularioType.Date
                                        || campoFormulario.type === CampoFormularioType.DateTime
                                        || campoFormulario.type === CampoFormularioType.Textarea
                                        || campoFormulario.type === CampoFormularioType.Select
                                        || campoFormulario.type === CampoFormularioType.Number
                                    ) ? false : true}
                                    info={campoFormulario.help}
                                    step={(campoFormulario.type === CampoFormularioType.Number && campoFormulario.number) ? campoFormulario.number.step : ''}
                                    value={campoFormulario.type === CampoFormularioType.Number ? +field.value : field.value}
                                    error={MostrarErrores(errors, field, campoFormulario)}
                                    media={campoFormulario.icon ? campoFormulario.icon : <><img className={'icon-small'}
                                                  src="https://cdn-icons-png.flaticon.com/512/16/16363.png"
                                                  alt=""/></>}
                                    onChange={field.onChange}
                                    onClear={() => {
                                        setValue(campoFormulario.formControlName as any, '', {
                                            shouldValidate: true,
                                            shouldDirty: true,
                                            shouldTouch: true
                                        })
                                    }}
                                    onBlur={field.onBlur}
                                >
                                    {
                                        campoFormulario.type === CampoFormularioType.Select &&
                                        campoFormulario.select &&
                                        campoFormulario.select.opciones.map(
                                            (opcion) => (
                                                <option key={opcion.id} value={opcion.value}>{opcion.label}</option>)
                                        )
                                    }
                                </ListInput>
                            </div> as any
                        )
                    }
                    }
                />)
        }
        const esAutocomplete = campoFormulario.type === CampoFormularioType.Autocomplete;
        if (esAutocomplete && campoFormulario.autocomplete) {
            const mostrarValor = (field?: any) => {
                let valorAMostrar = '';
                if (campoFormulario.autocomplete) {
                    if (!field) {
                        if (typeof campoFormulario.initialValue === 'object' && !Array.isArray(campoFormulario.initialValue)) {
                            valorAMostrar = campoFormulario.initialValue[campoFormulario.autocomplete.nombrePropiedadObjeto];
                        } else {
                            valorAMostrar = campoFormulario.initialValue;
                        }
                    } else {
                        if (typeof field.value === 'object' && !Array.isArray(field.value)) {
                            valorAMostrar = field.value[campoFormulario.autocomplete.nombrePropiedadObjeto];
                        } else {
                            valorAMostrar = field.value;
                        }
                    }
                }
                return valorAMostrar;
            }
            return (
                <div
                    key={campoFormulario.formControlName}
                    onClick={() => setEventoAutocomplete({...campoFormulario, __key: new Date().getTime()})}>
                    <motion.div
                        whileTap={{scale: 1.01}}
                    >

                        <Controller
                            name={campoFormulario.formControlName as any}
                            control={control as any}
                            rules={reglas}
                            render={
                                ({field}) => (
                                    <div>
                                        <ListItem
                                            media={campoFormulario.icon ? campoFormulario.icon : <><img className={'icon-small'}
                                                          src="https://cdn-icons-png.flaticon.com/512/16/16363.png"
                                                          alt=""/></>}
                                            header={errors[campoFormulario.formControlName] ?
                                                <span className={'text-red-500'}>{generarLabel()}</span> :
                                                generarLabel()}
                                            title={mostrarValor(field) === '' ? campoFormulario.placeholder : mostrarValor(field)}
                                            titleWrapClassName={field.value ? '' : 'texto-placeholder'}
                                            after={<><img className={'icon-small'}
                                                          src="https://cdn2.iconfinder.com/data/icons/business-management-color/64/select-choose-right-person-hr-job-human-resource-512.png"
                                                          alt=""/></>}
                                            footer={errors[campoFormulario.formControlName] ?
                                                <span
                                                    className={'text-red-500'}>{MostrarErrores(errors, field, campoFormulario)}</span> :
                                                campoFormulario.help
                                            }
                                        />
                                    </div>
                                )
                            }
                        />
                    </motion.div>
                </div>
            )
        }
        const esToggle = campoFormulario.type === CampoFormularioType.Toggle;
        if (esToggle && campoFormulario.toggle) {
            return (
                <div
                    key={campoFormulario.formControlName}>
                    <Controller
                        name={campoFormulario.formControlName as any}
                        control={control as any}
                        rules={reglas}
                        render={
                            ({field}) => (
                                <div>
                                    <ListItem
                                        media={<><img className={'icon-small'}
                                                      src="https://cdn-icons-png.flaticon.com/512/16/16363.png"
                                                      alt=""/></>}
                                        header={campoFormulario.label + (campoFormulario.validators.required ? ' *' : '') + ':'}
                                        titleWrapClassName={field.value ? '' : 'texto-placeholder'}
                                        title={field.value ? campoFormulario.toggle?.opcionPositivaLabel : campoFormulario.toggle?.opcionNegativaLabel}
                                        after={
                                            <Toggle
                                                className="-my-1"
                                                checked={field.value}
                                                onChange={field.onChange}
                                            />
                                        }
                                        footer={campoFormulario.help}
                                    />
                                </div>
                            )
                        }
                    />
                </div>
            )
        }
    }
    let arregloGruposLocal: CampoFormularioAccordeonInterface[] = [];
    if (props.accordeonCampos) {
        arregloGruposLocal = props.accordeonCampos.map(
            (step) => {
                step.camposFormulario = props.campos.filter(a => step.campos.some(sc => sc === a.formControlName))
                return step;
            }
        )
    }
    return [
        eventoAutocomplete,
        setEventoAutocomplete,
        (
            <>
                {
                    arregloGruposLocal.length === 0 ?
                        props.campos.map((f) => generarCampo(f)) :
                        arregloGruposLocal
                            .map(
                                (aGL) => {
                                    return (
                                        <Accordion key={aGL.id} className={'accordion-form'} >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon/>}
                                                className={'accordion-form-summary'}
                                                aria-controls={aGL.id}
                                                id={aGL.id}
                                            >
                                                {aGL.labelJSXElement}
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="accordion-detalle-texto">{aGL.descripcion}</div>
                                                <List>
                                                    {aGL
                                                        .camposFormulario.map((f) => generarCampo(f))
                                                    }
                                                </List>
                                            </AccordionDetails>
                                        </Accordion>
                                    )
                                }
                            )
                }
            </>
        ),
    ];
}