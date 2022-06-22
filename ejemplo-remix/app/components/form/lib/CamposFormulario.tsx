import {
    ListInput,
    ListItem,
} from "konsta/react";
import {Controller} from "react-hook-form";
import {UseFormReturn} from "react-hook-form/dist/types";
import {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";
import {CampoFormularioType} from "~/components/form/lib/enum/campo-formulario.type";
import {motion} from "framer-motion";
import {useState} from "react";
import {GenerarReglas} from "~/components/form/lib/funcion/generar-reglas";
import {MostrarErrores} from "~/components/form/lib/funcion/mostrar-errores";

export default function CamposFormulario(props: { useFormReturn: UseFormReturn<any, any>, campos: CampoFormularioInterface[] }) {

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
        let reglas: any = GenerarReglas(campoFormulario);

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
                                    media={<><img className={'icon-small'}
                                                  src="https://cdn-icons-png.flaticon.com/512/16/16363.png"
                                                  alt=""/></>}
                                    onChange={field.onChange}
                                    onClear={() => {
                                        setValue(campoFormulario.formControlName, '', {
                                            shouldValidate: true,
                                            shouldDirty: true,
                                            shouldTouch: true
                                        })
                                    }}
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
        if (esAutocomplete) {
            return (
                <div
                    key={campoFormulario.formControlName}
                    onClick={() => setEventoAutocomplete(campoFormulario)}>

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
                                        <input type="hidden" value={field.value}/>
                                        <ListItem
                                            media={<><img className={'icon-small'}
                                                          src="https://cdn-icons-png.flaticon.com/512/16/16363.png"
                                                          alt=""/></>}
                                            header={campoFormulario.label + (campoFormulario.validators.required ? ' *' : '') + ':'}
                                            title={field.value ? field.value : campoFormulario.placeholder}
                                            titleWrapClassName={field.value ? '' : 'texto-placeholder'}
                                            after={<><img className={'icon-small'}
                                                          src="https://cdn2.iconfinder.com/data/icons/business-management-color/64/select-choose-right-person-hr-job-human-resource-512.png"
                                                          alt=""/></>}
                                            footer={(<><p>PENE</p></>)}
                                        />
                                    </div>
                                )
                            }
                        />

                    </motion.div>

                    {/*<Controller*/}
                    {/*    key={campoFormulario.formControlName}*/}
                    {/*    name={campoFormulario.formControlName as any}*/}
                    {/*    control={control as any}*/}
                    {/*    rules={reglas}*/}
                    {/*    render={({field}) => {*/}
                    {/*        // IF mobile => xxxx*/}
                    {/*        // IF Web => xxxx*/}
                    {/*        return (*/}
                    {/*            <div>*/}
                    {/*                <ListInput*/}
                    {/*                    label={campoFormulario.label + (campoFormulario.validators.required ? ' *' : '') + ':'}*/}
                    {/*                    type={campoFormulario.type}*/}
                    {/*                    name={campoFormulario.formControlName}*/}
                    {/*                    placeholder={campoFormulario.placeholder}*/}
                    {/*                    info={campoFormulario.help}*/}
                    {/*                    step={(campoFormulario.type === CampoFormularioType.Number && campoFormulario.number) ? campoFormulario.number.step : ''}*/}
                    {/*                    value={campoFormulario.type === CampoFormularioType.Number ? +field.value : field.value}*/}
                    {/*                    error={mostrarErrores(errors, field, campoFormulario)}*/}
                    {/*                    media={<><img className={'icon-small'}*/}
                    {/*                                  src="https://cdn-icons-png.flaticon.com/512/16/16363.png"*/}
                    {/*                                  alt=""/></>}*/}
                    {/*                    onChange={field.onChange}*/}
                    {/*                >*/}
                    {/*                </ListInput>*/}
                    {/*            </div> as any*/}
                    {/*        )*/}
                    {/*    }*/}
                    {/*    }*/}
                    {/*/>*/}


                    {/*<Sheet*/}
                    {/*    className="pb-safe"*/}
                    {/*    opened={autocompleteAbierto}*/}
                    {/*    onBackdropClick={() => setAutocompleteAbierto(false)}*/}
                    {/*>*/}
                    {/*    <Toolbar top>*/}
                    {/*        <div className="left" />*/}
                    {/*        <div className="right">*/}
                    {/*            <Link toolbar onClick={() => setAutocompleteAbierto(false)}>*/}
                    {/*                Done*/}
                    {/*            </Link>*/}
                    {/*        </div>*/}
                    {/*    </Toolbar>*/}
                    {/*    <Block>*/}
                    {/*        <p>*/}
                    {/*            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum ad*/}
                    {/*            excepturi nesciunt nobis aliquam. Quibusdam ducimus neque*/}
                    {/*            necessitatibus, molestias cupiditate velit nihil alias incidunt,*/}
                    {/*            excepturi voluptatem dolore itaque sapiente dolores!*/}
                    {/*        </p>*/}
                    {/*        <div className="mt-4">*/}
                    {/*            <Button onClick={() => setAutocompleteAbierto(false)}>Action</Button>*/}
                    {/*        </div>*/}
                    {/*    </Block>*/}
                    {/*</Sheet>*/}
                </div>
            )
        }
    }
    return [
        eventoAutocomplete,
        setEventoAutocomplete,
        (
            <>
                {props.campos.map((f) => generarCampo(f))}
            </>
        ),
    ];
}