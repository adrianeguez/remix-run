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

interface RequestData {
    request: Request
}

let evento: CampoFormularioInterface;
export const action = async (req: RequestData): Promise<ActionFunction> => {
    const body = await req.request.formData();
    // fetc POST libro-biblioteca NESTJS
    return redirect('/libro-biblioteca/new') as any;
}

export default function New() {
    // Inicializar variables
    const [popupOpened, setPopupOpened] = useState(false);
    const [autocompleteActual, setAutocompleteActual] = useState('');
    const [listaAutocomplete, setListaAutocomplete] = useState([] as any[]);
    const [campos, setCampos] = useState([
        {
            formControlName: 'nombre',
            help: 'Ingrese un nombre',
            label: 'Nombre',
            initialValue: 'Adrian',
            actualValue: '',
            type: CampoFormularioType.Text,
            valid: false,
            placeholder: 'EJ: Adrian',
            validators: {
                required: true,
                minLength: {
                    value: 4,
                    mensaje: 'No '
                },
                maxLength: {
                    value: 9,
                    mensaje: 'No '
                },
                pattern: {
                    pattern: new RegExp(/([A-Z])\w+/),
                    mensaje: 'Ingrese solo letras'
                }
            }
        },
        {
            formControlName: 'password',
            help: 'Ingrese un password',
            label: 'Password',
            initialValue: 'p4ssword',
            actualValue: '',
            type: CampoFormularioType.Password,
            valid: false,
            placeholder: 'EJ: xxxxxxxx',
            validators: {
                // no validators
            }
        },
        {
            formControlName: 'email',
            help: 'Ingrese un correo',
            label: 'Email',
            initialValue: 'a@a.com',
            actualValue: '',
            type: CampoFormularioType.Email,
            valid: false,
            placeholder: 'EJ: a@a.com',
            validators: {
                // no validators
                email: {
                    mensaje: 'Ingrese un correo valido'
                }
            }
        },
        {
            formControlName: 'url',
            help: 'Ingrese un URL',
            label: 'URL',
            initialValue: '',
            actualValue: '',
            type: CampoFormularioType.Url,
            valid: false,
            placeholder: 'EJ: https://...',
            validators: {
                // no validators
                url: {
                    mensaje: 'Ingrese un url correctamente'
                }
            }
        },
        {
            formControlName: 'telefono',
            help: 'Ingrese su telefono',
            label: 'Telefono',
            initialValue: '',
            actualValue: '',
            type: CampoFormularioType.Url,
            valid: false,
            placeholder: 'EJ: 0995774444',
            validators: {
                // no validators
            }
        },
        {
            formControlName: 'fecha',
            help: 'Ingrese la fecha de nacimiento',
            label: 'Fecha nacimiento',
            initialValue: new Date().toISOString().slice(0, 10),
            actualValue: '',
            type: CampoFormularioType.Date,
            valid: false,
            placeholder: 'EJ: 0995774444',
            validators: {
                // no validators
            }
        },
        {
            formControlName: 'fechaHora',
            help: 'Ingrese la fecha hora de logeo',
            label: 'Fecha hora logeo',
            initialValue: new Date().toISOString().slice(0, 16),
            actualValue: '',
            type: CampoFormularioType.DateTime,
            valid: false,
            placeholder: 'EJ: 0995774444',
            validators: {
                // no validators
            }
        },
        {
            formControlName: 'textarea',
            help: 'Ingrese una descripcion',
            label: 'Descripcion',
            initialValue: `Hola
            descripcion`,
            actualValue: '',
            type: CampoFormularioType.Textarea,
            valid: false,
            placeholder: 'EJ: El dia 10 de ...',
            validators: {
                // no validators
            }
        },
        {
            formControlName: 'select',
            help: 'Seleccione un dia de la semana',
            label: 'Dia semana',
            initialValue: `lunes`,
            actualValue: '',
            type: CampoFormularioType.Select,
            valid: false,
            placeholder: 'EJ: Lun/Mart',
            validators: {
                // no validators
            },
            select: {
                opciones: [
                    {
                        id: 'lunes',
                        label: 'Lunes',
                        value: 'lunes',
                    },
                    {
                        id: 'martes',
                        label: 'Martes',
                        value: 'martes',
                    },
                    {
                        id: 'miercoles',
                        label: 'Miercoles',
                        value: 'miercoles',
                    }
                ]
            }
        },
        {
            formControlName: 'numero',
            help: 'Ingrese su sueldo',
            label: 'Sueldo',
            initialValue: 10.02,
            actualValue: '',
            type: CampoFormularioType.Number,
            valid: false,
            placeholder: 'EJ: 10.02',
            validators: {
                max: {
                    value: 15,
                    validationFn: (v) => v < 15 ? true : 'No mayor a 15'
                },
                min: {
                    value: -5,
                    validationFn: (v) => v > -5 ? true : 'No menor a -5'
                }
            },
            number: {
                step: 0.1,
            }
        },
        {
            formControlName: 'autocomplete',
            help: 'Seleccione un libro',
            label: 'Libro',
            initialValue: 2,
            actualValue: '',
            type: CampoFormularioType.Autocomplete,
            valid: false,
            placeholder: 'EJ: 10.02',
            validators: {},
            autocomplete: {
                nombrePropiedadObjeto: 'id'
            }
        }
    ] as CampoFormularioInterface[]);
    const [actionsOneOpened, setActionsOneOpened] = useState(false);
    const [seleccionoListaAutocomplete, setSeleccionoListaAutocomplete] = useState({} as any);


    // Hooks Librearias
    const navigate = useNavigate();
    const data = useLoaderData();
    const theme = useTheme();
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

    // Use Effects

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
    useEffect(
        () => {
            if (Object.keys(seleccionoListaAutocomplete).length > 0) {
                console.log('Selecciono', seleccionoListaAutocomplete)
                useFormReturn.setValue(evento.formControlName as any, seleccionoListaAutocomplete, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true
                })
                setEventoAutocomplete({} as any);
                setTimeout(
                    () => {
                        console.log(useFormReturn.getValues("autocomplete" as any));
                    },
                    1000
                )
            }
        },
        [seleccionoListaAutocomplete]
    )

    // Metodos
    // Metodos Page
    const salir = () => {
        setPopupOpened(false);
        setTimeout(
            () => {
                navigate({pathname: "/libro-biblioteca"})
            },
            500
        );
    }
    // Metodos UI
    const anadirNuevo = () => {
        setCampos([...campos,
            {
                formControlName: 'nombre' + Date.now(),
                help: 'Ingrese un nombre',
                label: 'Nombre',
                initialValue: 'Adrian',
                actualValue: '',
                type: CampoFormularioType.Text,
                valid: false,
                placeholder: 'EJ: Adrian',
                validators: {
                    required: true,
                    minLength: {
                        value: 4,
                        mensaje: 'No '
                    },
                    maxLength: {
                        value: 9,
                        mensaje: 'No '
                    },
                    pattern: {
                        pattern: new RegExp(/([A-Z])\w+/),
                        mensaje: 'Ingrese solo letras'
                    },
                    url: {
                        mensaje: 'Ingrese solo letras'
                    },
                    email: {
                        mensaje: 'Ingrese solo letras'
                    }
                }
            },])
    }
    const eliminarUltimo = () => {
        setCampos([
            ...campos.filter((c, i) => i < campos.length - 2)
        ])
    }
    // Metodos Formulario
    const onSubmit: SubmitHandler<any> = data => {
        console.log('COSAS', useFormReturn.formState, data);
        // const formData = new FormData(document.getElementById('form'))
        // fetch('/libro-biblioteca/new', {method: 'POST', body: formData})
    };
    // Metodos Autocomplete
    const cerrarAction = () => {
        setActionsOneOpened(false);
        setListaAutocomplete([]);
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
                        if (Object.keys(evento).length > 0) {
                            switch (evento.formControlName) {
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
    const buscarLibroBiblioteca = async (data: ObservableWatchCampoInterface, campo: CampoFormularioInterface) => {
        let librosBiblioteca;
        if (Number.isNaN(Number(data.value))) {
            librosBiblioteca = await LibroBibliotecaHttp().find({});

        } else {
            librosBiblioteca = await LibroBibliotecaHttp().find({id: +data.value});
        }
        setListaAutocomplete(librosBiblioteca[0]);
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
                                    setSeleccionoListaAutocomplete={setSeleccionoListaAutocomplete}>
            </CamposFormularioAction>
        </>
    )
}