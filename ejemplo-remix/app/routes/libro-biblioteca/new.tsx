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
import BackdropToaster from "~/components/util/backdrop-toaster";
import CamposFormularioActionAutocomplete from "~/components/form/lib/CamposFormularioActionAutocomplete";
import {LibroBibliotecaCreateDto} from "~/http/libro-biblioteca/dto/libro-biblioteca-create.dto";

interface RequestData {
    request: Request
}

type LoaderData = {
    findDto?: LibroBibliotecaFindDto;
};
// Objeto necesario para que funcione la ruta
let eventoAutocompleteLocal: CampoFormularioInterface;
// Setear query params
export const loader: LoaderFunction = async ({request}) => {
    const requestUrl = request.url;
    const findDto: LibroBibliotecaFindDto = LoaderSetQueryparams(requestUrl);
    const url = new URL(requestUrl);
    return json({findDto});
};

export const action = async (req: RequestData): Promise<ActionFunction> => {
    // Cargar Queryparams
    const requestUrl = req.request.url;
    const findDto = LoaderSetQueryparams(requestUrl);

    // Generar Body
    const body = await req.request.formData();
    const createDto: LibroBibliotecaCreateDto = {
        sisHabilitado: SisHabilitadoEnum.Activo
    };
    try {
        const respuesta = await LibroBibliotecaInstanceHttp.create(createDto);
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
    const [listaAutocomplete, setListaAutocomplete] = useState([] as any[]);
    const [campos, setCampos] = useState([...LibroBibliotecaForm()] as CampoFormularioInterface[]);
    const [actionAutocompleteAbierto, setActionAutocompleteAbierto] = useState(false);
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
    // Custom Hooks - Campo Formulario
    const [eventoAutocomplete, setEventoAutocomplete, CamposFormularioComponente] = CamposFormulario({
        useFormReturn,
        campos
    });


    // Use Effects
    // Use Effect - Componente inicializado
    useEffect(
        () => {
            escucharEventoAutocompleteBusqueda();
            setTimeout(
                () => {
                    setPopupOpened(true);
                },
                1
            );
        },
        []
    )
    // Use Effect - eventoAutocomplete
    useEffect(
        () => {
            eventoAutocompleteLocal = eventoAutocomplete;
            if (tieneCampoFormulario) {
                setActionAutocompleteAbierto(true);
            } else {
                setActionAutocompleteAbierto(false);
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
    // Use Effect - Buscar autocomplete
    useEffect(
        () => {
            if (actionAutocompleteAbierto) {
                buscarAutocomplete({value: '', data: {}, info: {type: '', name: ''}}).then();
            }
        },
        [actionAutocompleteAbierto]
    )

    // Metodos y Funciones
    // Funciones util
    const tieneCampoFormulario = Object.keys(eventoAutocomplete).length > 0;
    const generarComponenteAutocompletePorFormControlName = {
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
    const toastInfo = (mensaje) => {
        toast(mensaje, {
            icon: '📑'
        })
    };
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
        console.log('dataForm', dataForm);
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
                variants={{
                    animate: {opacity: 1},
                }}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{duration: 1}}
            >
                <Popup className={"pop-up-konstaui"} opened={popupOpened} onBackdropClick={() => salir()}>
                    <>
                        <Navbar
                            title="Nuevo libro biblioteca"
                            right={
                                <div onClick={() => salir()}>
                                    Cerrar
                                </div>
                            }
                        />
                        <Block className="space-y-4 popup-modal">
                            <BlockTitle>Ejemplo de formulario</BlockTitle>
                            <br/>
                            <List hairlines={true}>
                                <Form id="form" action="/libro-biblioteca/new" method="POST"
                                      onSubmit={useFormReturn.handleSubmit(onSubmit)} noValidate>
                                    {CamposFormularioComponente}
                                </Form>
                            </List>
                        </Block>
                        <Button large typeof={'submit'}> Crear </Button>
                    </>
                </Popup>
            </motion.div>
            <CamposFormularioActionAutocomplete actionsOneOpened={actionAutocompleteAbierto}
                                                useFormAutocomplete={useFormAutocomplete}
                                                listaAutocomplete={listaAutocomplete}
                                                setSeleccionoListaAutocomplete={setSeleccionoListaAutocomplete}
                                                generarComponente={generarComponenteAutocompletePorFormControlName}
                                                campoFormulario={eventoAutocompleteLocal}
                                                setListaAutocomplete={setListaAutocomplete}
                                                setActionsOneOpened={setActionAutocompleteAbierto}
                                                setEventoAutocomplete={setEventoAutocomplete}
            >
            </CamposFormularioActionAutocomplete>
            <BackdropToaster loading={loading}></BackdropToaster>
        </>
    )
}