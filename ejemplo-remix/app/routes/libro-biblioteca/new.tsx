import {motion} from "framer-motion"
import {
    Actions, ActionsButton,
    ActionsGroup, ActionsLabel,
    Block,
    BlockTitle,
    Button,
    List,
    ListItem,
    Navbar,
    Page,
    Popup,
    useTheme
} from "konsta/react";
import {useEffect, useState} from "react";
import {Form, useLoaderData, useNavigate} from "@remix-run/react";
import {ActionFunction, redirect, Request} from "@remix-run/node";
import {SubmitHandler, useForm} from "react-hook-form";
import {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";
import CamposFormulario from "~/components/form/lib/CamposFormulario";
import {CampoFormularioType} from "~/components/form/lib/enum/campo-formulario.type";
import {Controller} from "react-hook-form";
import {
    debounceTime,
    defer,
    delay, distinct,
    fromEvent, mergeMap,
    Observable,
    of,
    scan,
    skipUntil,
    take,
    takeLast,
    takeUntil,
    timer
} from 'rxjs';
import {InputBusquedaAutocomplete} from "~/components/form/lib/InputBusquedaAutocomplete";
import {GenerarObservableWatchCampo} from "~/components/form/lib/funcion/generar-observable-watch-campo";
import {LibroBibliotecaHttp} from "~/http/libro-biblioteca/libro-biblioteca.http";
import {ObservableWatchCampoInterface} from "~/components/form/lib/interfaces/observable-watch-campo.interface";
import {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";

interface RequestData {
    request: Request
}

let evento;
export const action = async (req: RequestData): Promise<ActionFunction> => {
    const body = await req.request.formData();
    // fetc POST libro-biblioteca NESTJS
    return redirect('/libro-biblioteca/new') as any;
}

export default function New() {
    const [popupOpened, setPopupOpened] = useState(false);
    const [autocompleteActual, setAutocompleteActual] = useState('');
    const [listaAutocomplete, setListaAutocomplete] = useState([]);
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
            initialValue: 'culeo',
            actualValue: '',
            type: CampoFormularioType.Autocomplete,
            valid: false,
            placeholder: 'EJ: 10.02',
            validators: {},
        }
    ] as CampoFormularioInterface[]);
    const navigate = useNavigate();
    const animationConfiguration = {
        animate: {opacity: 1},
    };
    const salir = () => {
        setPopupOpened(false);
        setTimeout(
            () => {
                navigate({pathname: "/libro-biblioteca"})
            },
            500
        );
    }
    const cerrarAction = () => {
        setEventoAutocomplete({});
        setActionsOneOpened(false);
    }
    const data = useLoaderData();
    const theme = useTheme();
    const hairlines = theme !== 'material';
    let defaultValuesObject: any = {};
    let defaultValues = () => {
        campos.forEach(
            (campo) => {
                defaultValuesObject[campo.formControlName] = campo.initialValue;
            }
        )
    }
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
    defaultValues();
    const useFormReturn = useForm<any>({defaultValues: {...defaultValuesObject}});
    const useFormAutocomplete = useForm<any>({defaultValues: {busqueda: ''}});
    const onSubmit: SubmitHandler<any> = data => {
        console.log('COSAS', useFormReturn.formState, data);
        // const formData = new FormData(document.getElementById('form'))
        // fetch('/libro-biblioteca/new', {method: 'POST', body: formData})
    };

    const [actionsOneOpened, setActionsOneOpened] = useState(false);
    const [eventoAutocomplete, setEventoAutocomplete, CamposFormularioComponente] = CamposFormulario({
        useFormReturn,
        campos
    });
    const tieneCampoFormulario = Object.keys(eventoAutocomplete).length > 0
    useEffect(
        () => {
            setTimeout(
                () => {
                    setPopupOpened(true);
                },
                1
            );
            buscarAutocomplete();
        },
        []
    )
    const buscarAutocomplete = () => {
        GenerarObservableWatchCampo(
            'busqueda',
            useFormAutocomplete
        )
            .subscribe(
                {
                    next: async (data) => {
                        console.log('evento', evento, eventoAutocomplete)
                        console.log('LLEGA DATA', data, evento);
                        if (Object.keys(evento).length > 0) {
                            console.log('eventoAutocomplete', evento);
                            switch (evento.formControlName) {
                                case 'autocomplete':
                                    console.log('buscarLibroBiblioteca');
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
    const buscarLibroBiblioteca = async (data: ObservableWatchCampoInterface, campo: CampoFormularioInterface) => {
        let librosBiblioteca;
        if(Number.isNaN(Number(data.value))){
            librosBiblioteca = await LibroBibliotecaHttp().find({});

        }else{
            librosBiblioteca = await LibroBibliotecaHttp().find({id: +data.value});
        }
        setListaAutocomplete(librosBiblioteca[0]);
    }
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
                            {/*<Form action="/libro-biblioteca/new" method="POST" onSubmit={handleSubmit(onSubmit)}>*/}
                            <BlockTitle>Ejemplo de formulario</BlockTitle>
                            <br/>
                            <List hairlines={hairlines}>
                                <Form id="form" action="/libro-biblioteca/new" method="POST"
                                      onSubmit={useFormReturn.handleSubmit(onSubmit)} noValidate>
                                    {CamposFormularioComponente}
                                    <Button large typeof={'submit'}> submit </Button>
                                </Form>
                            </List>
                            <Button large typeof={'button'} onClick={(e) => {
                                e.preventDefault();
                                eliminarUltimo()
                            }}> ELIMINAR</Button>
                            <Button large typeof={'button'} onClick={(e) => {
                                e.preventDefault();
                                anadirNuevo()
                            }}> ANADIR NUEVO </Button>
                            {/*</Form>*/}
                        </Block>
                    </Page>
                </Popup>
            </motion.div>
            <div className={'action-konstaui'}>
                <Actions
                    className={'action-konstaui'}
                    opened={actionsOneOpened}
                    onBackdropClick={() => cerrarAction()}
                >

                    <ActionsGroup>
                        <ActionsLabel>
                            Buscando registros
                        </ActionsLabel>
                        <List className={'action-list-helper-konstaio'}>
                            <InputBusquedaAutocomplete useFormAutocomplete={useFormAutocomplete}/>
                            {listaAutocomplete.length === 0 &&
                                <ListItem title={'0 Registros encontrados'}/>
                            }
                        </List>
                        <List className={'action-list-konstaio'}>
                            {listaAutocomplete.map(
                                (v: LibroBibliotecaInterface) => (<ListItem key={v.id} title={'Libro biblioteca: ' + (v.id ? v.id.toString() : '')}/>)
                            )}
                        </List>
                        {/*<List className={'action-list-helper-konstaio'}>*/}
                        {/*    <ListItem title="Si no encuentras lo que buscas cierra y busca de nuevo"*/}
                        {/*              className={'text-center'}/>*/}
                        {/*</List>*/}
                        <ActionsButton
                            onClick={() => cerrarAction()}
                            colors={{text: 'text-red-500'}}
                        >
                            Cancelar
                        </ActionsButton>
                    </ActionsGroup>
                </Actions>
            </div>
        </>
    )
}