import {motion} from "framer-motion"
import {Block, BlockTitle, Button, List, Navbar, Page, Popup, useTheme} from "konsta/react";
import {useEffect, useState} from "react";
import {Form, useLoaderData, useNavigate} from "@remix-run/react";
import type {ActionFunction, Request} from "@remix-run/node";
import {json, LoaderFunction, redirect} from "@remix-run/node";
import type {SubmitHandler} from "react-hook-form";
import {useForm} from "react-hook-form";
import type {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";
import CamposFormulario from "~/components/form/lib/CamposFormulario";
import {CampoFormularioType} from "~/components/form/lib/enum/campo-formulario.type";
import {GenerarObservableWatchCampo} from "~/components/form/lib/funcion/generar-observable-watch-campo";
import type {ObservableWatchCampoInterface} from "~/components/form/lib/interfaces/observable-watch-campo.interface";
import CamposFormularioAction from "~/components/form/lib/CamposFormularioAction";
import toast, {Toaster} from 'react-hot-toast';
import type {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";
import {Backdrop, CircularProgress} from "@mui/material";
import {BackdropConstant} from "~/constantes/backdrop.constant";
import {LibroBibliotecaMostrar} from "~/components/libro-biblioteca/LibroBibliotecaMostrar";
import {LibroBibliotecaForm} from "~/http/libro-biblioteca/form/libro-biblioteca.form";
import {LibroBibliotecaInstanceHttp} from "~/http/libro-biblioteca/libro-biblioteca-instance.http";
import {SisHabilitadoEnum} from "~/enum/sis-habilitado.enum";
import {LibroBibliotecaFindDto} from "~/http/libro-biblioteca/dto/libro-biblioteca-find.dto";
import {LoaderSetQueryparams} from "~/functions/http/loader-set-queryparams";
import {eliminarUndNullVacio} from "~/functions/util/eliminar-und-null-vacio";
import {convertirQueryParams} from "~/functions/http/convertir-query-params";

interface RequestData {
    request: Request
}

type LoaderData = {
    findDto?: LibroBibliotecaFindDto;
};
let eventoAutocompleteLocal: CampoFormularioInterface;
export const loader: LoaderFunction = async ({request}) => {
    const requestUrl = request.url;
    const findDto: LibroBibliotecaFindDto = LoaderSetQueryparams(requestUrl);
    const url = new URL(requestUrl);
    return json({findDto});
};

export const action = async (req: RequestData): Promise<ActionFunction> => {
    const body = await req.request.formData();
    const requestUrl = req.request.url;
    const findDto = LoaderSetQueryparams(requestUrl);

    try {
        const respuesta = await LibroBibliotecaInstanceHttp.create({sisHabilitado: SisHabilitadoEnum.Activo});
        // fetc POST libro-biblioteca NESTJS
        return redirect(`/libro-biblioteca?${convertirQueryParams(eliminarUndNullVacio(findDto))}&mensaje=Registro libro biblioteca creado`) as any;
    } catch (error) {
        console.error({error, mensaje: 'Error creando libro biblioteca'});
        return new Response(null as any, {status: 500}) as any;
    }
}

export default function New() {
    // Inicializar variables
    const [popupOpened, setPopupOpened] = useState(false);
    const [autocompleteActual, setAutocompleteActual] = useState('');
    const [listaAutocomplete, setListaAutocomplete] = useState([] as any[]);
    const [campos, setCampos] = useState([...LibroBibliotecaForm()] as CampoFormularioInterface[]);
    const [actionsOneOpened, setActionsOneOpened] = useState(false);
    const [loading, setLoading] = useState(false);
    const [seleccionoListaAutocomplete, setSeleccionoListaAutocomplete] = useState({} as { registro: any, campoFormulario: CampoFormularioInterface });


    // Hooks Librearias
    const navigate = useNavigate();
    const data: LoaderData = useLoaderData();
    const theme = useTheme();
    const defaultValues = () => {
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
    const useFormReturn = useForm<any>({defaultValues: {...defaultValues()}});
    const useFormAutocomplete = useForm<any>({defaultValues: {busqueda: ''}});

    // Custom Hooks
    const [eventoAutocomplete, setEventoAutocomplete, CamposFormularioComponente] = CamposFormulario({
        useFormReturn,
        campos
    });

    // Variables util
    const animationConfiguration = {
        animate: {opacity: 1},
    };
    const hairlines = theme !== 'material';

    // Funciones util
    const tieneCampoFormulario = Object.keys(eventoAutocomplete).length > 0;
    const toastInfo = (mensaje) => {
        toast(mensaje, {
            icon: '📑'
        })
    };
    const generarComponenteAutocompleteLibroBiblioteca = {
        autocomplete: (registro: LibroBibliotecaInterface, campoFormulario: CampoFormularioInterface) => {
            return (<><LibroBibliotecaMostrar registro={registro}/></>)
        },
    };
    const buscarAutocomplete = async (data: ObservableWatchCampoInterface) => {
        if ((Object.keys(eventoAutocompleteLocal).length > 0 && popupOpened) || (!tieneCampoFormulario)) {
            switch (eventoAutocompleteLocal.formControlName) {
                case 'autocomplete':
                    await buscarLibroBiblioteca(data, eventoAutocompleteLocal);
                    break;
                default:
                    break;
            }
        }
    };

    // Use Effects
    // Use Effect - Componente inicializado
    useEffect(
        () => {
            setTimeout(
                () => {
                    setPopupOpened(true);
                },
                1
            );
            escucharEventoAutocompleteBusqueda();
        },
        []
    )
    // Use Effect - eventoAutocomplete
    useEffect(
        () => {
            eventoAutocompleteLocal = eventoAutocomplete;
            if (tieneCampoFormulario) {
                setActionsOneOpened(true);
            } else {
                setActionsOneOpened(false);
            }
        },
        [eventoAutocomplete]
    )
    // Use Effect - seleccionoListaAutocomplete
    useEffect(
        () => {
            if (Object.keys(seleccionoListaAutocomplete).length > 0) {
                useFormReturn.setValue(seleccionoListaAutocomplete.campoFormulario.formControlName as any, seleccionoListaAutocomplete.registro, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true
                })
                toast.success('Registro seleccionado');
                setSeleccionoListaAutocomplete({} as any);
            }
        },
        [seleccionoListaAutocomplete]
    )
    useEffect(
        () => {
            if (actionsOneOpened) {
                buscarAutocomplete({value: '', data: {}, info: {type: '', name: ''}}).then();
            }
        },
        [actionsOneOpened]
    )

    // Metodos
    // Metodos Page
    const salir = () => {
        setPopupOpened(false);
        setTimeout(
            () => {
                navigate({pathname: `/libro-biblioteca?${convertirQueryParams(data.findDto)}`})
            },
            500
        );
    }
    // Metodos Formulario
    const onSubmit: SubmitHandler<any> = async (dataForm) => {
        const formData = new FormData(document.getElementById('form'))
        setLoading(true);
        try {
            const respuesta = await fetch(`/libro-biblioteca/new?${convertirQueryParams(data.findDto)}`, {
                method: 'POST',
                body: formData
            })
            if (respuesta.redirected) {
                setLoading(false);
                window.location.replace(respuesta.url);
            } else {
                setLoading(false);
                toast.error('Error del servidor');
                console.error({error: respuesta, mensaje: 'Error creando nuevo registro'});
            }
        } catch (error) {
            setLoading(false);
            toast.error('Error del servidor');
            console.error({error, mensaje: 'Error creando nuevo registro'});
        }

    };
    // Metodos Autocomplete
    const cerrarAction = () => {
        setListaAutocomplete([]);
        setEventoAutocomplete({} as any);
        setActionsOneOpened(false);
        useFormAutocomplete.setValue('busqueda' as any, '' as any, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        } as any)
    }
    const escucharEventoAutocompleteBusqueda = () => {
        GenerarObservableWatchCampo(
            'busqueda',
            useFormAutocomplete
        )
            .subscribe(
                {
                    next: async (data) => {
                        setListaAutocomplete([]);
                        await buscarAutocomplete(data);
                    }
                }
            );
    }
    // Metodos REST
    const buscarLibroBiblioteca = async (data: ObservableWatchCampoInterface, campo: CampoFormularioInterface) => {
        try {
            let librosBiblioteca;
            setLoading(true);
            if (Number.isNaN(Number(data.value)) || data.value === '') {
                librosBiblioteca = await LibroBibliotecaInstanceHttp.find({});

            } else {
                librosBiblioteca = await LibroBibliotecaInstanceHttp.find({id: +data.value});
            }
            toastInfo(`${librosBiblioteca[0].length} registros consultados`);
            setListaAutocomplete(librosBiblioteca[0]);
            setLoading(false);
        } catch (error) {
            console.error({
                error,
                mensaje: 'Error consultado autocomplete libro biblioteca'
            });
            toast.error('Error del servidor');
            setLoading(false);
        }
    }

    return (
        <>
            <motion.div
                variants={animationConfiguration}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{duration: 1}}
            >
                <Popup className={"pop-up-konstaui"} opened={popupOpened} onBackdropClick={() => salir()}>
                    <Page>
                        <Navbar
                            title="Nuevo"
                            right={
                                <div onClick={() => salir()}>
                                    Close
                                </div>
                            }
                        />
                        <Block className="space-y-4">
                            <BlockTitle>Ejemplo de formulario</BlockTitle>
                            <br/>
                            <List hairlines={hairlines}>
                                <Form id="form" action="/libro-biblioteca/new" method="POST"
                                      onSubmit={useFormReturn.handleSubmit(onSubmit)} noValidate>
                                    {CamposFormularioComponente}
                                    <Button large typeof={'submit'}> submit </Button>
                                </Form>
                            </List>
                        </Block>
                    </Page>
                </Popup>
            </motion.div>
            <CamposFormularioAction actionsOneOpened={actionsOneOpened}
                                    cerrarAction={cerrarAction}
                                    useFormAutocomplete={useFormAutocomplete}
                                    listaAutocomplete={listaAutocomplete}
                                    setSeleccionoListaAutocomplete={setSeleccionoListaAutocomplete}
                                    generarComponente={generarComponenteAutocompleteLibroBiblioteca}
                                    campoFormulario={eventoAutocompleteLocal}
            >
            </CamposFormularioAction>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Backdrop
                sx={
                    BackdropConstant
                }
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        </>
    )
}