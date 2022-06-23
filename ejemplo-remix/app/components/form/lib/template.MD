

```tsx
import {motion} from "framer-motion"
import {Block, BlockTitle, Button, List, Navbar, Page, Popup, useTheme} from "konsta/react";
import {useEffect, useState} from "react";
import {Form, useLoaderData, useNavigate} from "@remix-run/react";
import {ActionFunction, redirect, Request} from "@remix-run/node";
import {SubmitHandler, useForm} from "react-hook-form";
import {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";
import CamposFormulario from "~/components/form/lib/CamposFormulario";
import {CampoFormularioType} from "~/components/form/lib/enum/campo-formulario.type";
import {GenerarObservableWatchCampo} from "~/components/form/lib/funcion/generar-observable-watch-campo";
import {LibroBibliotecaHttp} from "~/http/libro-biblioteca/libro-biblioteca.http";
import {ObservableWatchCampoInterface} from "~/components/form/lib/interfaces/observable-watch-campo.interface";
import CamposFormularioAction from "~/components/form/lib/CamposFormularioAction";

// tipado de request en el action
interface RequestData {
    request: Request
}

// Necesario para que funcione el autocomplete NO BORRAR
let evento: CampoFormularioInterface;  

export const action = async (req: RequestData): Promise<ActionFunction> => {
    const body = await req.request.formData();
    // Cualquier accion aqui
    return {} as any;
}

export default function Componente() {
    // Inicializar variables
    const [popupOpened, setPopupOpened] = useState(false);
    const [autocompleteActual, setAutocompleteActual] = useState('');
    const [listaAutocomplete, setListaAutocomplete] = useState([] as any[]);
    const [campos, setCampos] = useState([] as CampoFormularioInterface[]);
    const [actionsOneOpened, setActionsOneOpened] = useState(false);
    const [seleccionoListaAutocomplete, setSeleccionoListaAutocomplete] = useState({} as any);


    // Hooks Librearias
    
    // Para navegar en Remix Run
    const navigate = useNavigate();
    // Obtener datos de la funcion Loader
    const data = useLoaderData();
    // Segun el tema prepara la interfaz
    const theme = useTheme();
    // objeto de inicializacion de variables para `react-hook-form`
    const defaultValues = () => {
        let defaultValuesObject: any = {};
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
    // Crear hook de formulario
    const useFormReturn = useForm<any>({defaultValues: {...defaultValues()}});
    // Crear hook de autocomplete
    const useFormReturnAutocomplete = useForm<any>({defaultValues: {busqueda: ''}});

    // Custom Hooks
    // Custom Hook de formulario
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
            evento = eventoAutocomplete;
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
                useFormReturn.setValue(evento.formControlName as any, seleccionoListaAutocomplete, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true
                })
                setEventoAutocomplete({} as any);
            }
        },
        [seleccionoListaAutocomplete]
    )

    // Metodos
    // Metodos Route
    const salir = () => {
        setPopupOpened(false);
        setTimeout(
            () => {
                navigate({pathname: "/libro-biblioteca"})
            },
            500
        );
    }
    // Metodos Formulario
    const onSubmit: SubmitHandler<any> = data => {
        console.log('Dato', data);
        // Ejemplo 
        // Ejemplo de envio de informacion al endpoint de la ruta
        // Se necesita el formulario poner una identificacion en la etiqueta para poder enviarlo, en este caso el id="form"
        
        // Ejemplo:
        // const formData = new FormData(document.getElementById('form'))
        // fetch('/libro-biblioteca/new', {method: 'POST', body: formData})
    };
    // Metodos Autocomplete
    // Al cerrar el action cierra el popup action, setea la lista en vacio [], el input de busqueda lo pone en ''
    const cerrarAction = () => {
        setActionsOneOpened(false);
        setListaAutocomplete([]);
        useFormReturnAutocomplete.setValue('busqueda' as any, '' as any, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        } as any)
    }
    // Esta funcion escucha los cambios en el evento autocomplete, y con un switch consultamos los diferentes
    // datos del autocomplete como se encuentra ejemplificado:
    const escucharEventoAutocompleteBusqueda = () => {
        GenerarObservableWatchCampo(
            'busqueda',
            useFormReturnAutocomplete
        )
            .subscribe(
                {
                    next: async (data) => {
                        setListaAutocomplete([]);
                        if (Object.keys(evento).length > 0) {
                            switch (evento.formControlName) {
                                // Anadir el nombre de los distintos campos que son autocomplete en el formulario,
                                // en este caso el nombre del campo es 'autocomplete', si el nombre del campo es
                                // tablaPadre entonces hay que aumentar un case con 'tablaPadre' y luego creamos
                                // una funcion para buscarTablaPadre.
                                case 'autocomplete':
                                    await buscarLibroBiblioteca(data, evento);
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
            );
    }
    // Metodos REST
    // Ejemplo busqueda autocomplete
    const buscarLibroBiblioteca = async (data: ObservableWatchCampoInterface, campo: CampoFormularioInterface) => {
        let librosBiblioteca;
        if (Number.isNaN(Number(data.value))) {
            librosBiblioteca = await LibroBibliotecaHttp().find({});

        } else {
            librosBiblioteca = await LibroBibliotecaHttp().find({id: +data.value});
        }
        setListaAutocomplete(librosBiblioteca[0]);
    }

    // Renderizado del componente
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
                                    useFormAutocomplete={useFormReturnAutocomplete}
                                    listaAutocomplete={listaAutocomplete}
                                    setSeleccionoListaAutocomplete={setSeleccionoListaAutocomplete}>
            </CamposFormularioAction>
        </>
    )
}
```