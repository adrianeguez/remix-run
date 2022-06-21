import {motion} from "framer-motion"
import {Block, BlockTitle, Button, List, Navbar, Page, Popup, useTheme} from "konsta/react";
import {useEffect, useState} from "react";
import {Form, useLoaderData, useNavigate} from "@remix-run/react";
import {ActionFunction, redirect, Request} from "@remix-run/node";
import {SubmitHandler, useForm} from "react-hook-form";
import {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";
import CamposFormulario from "~/components/form/lib/CamposFormulario";
import {CampoFormularioType} from "~/components/form/lib/enum/campo-formulario.type";

interface RequestData {
    request: Request
}

export const action = async (req: RequestData): Promise<ActionFunction> => {
    const body = await req.request.formData();
    // fetc POST libro-biblioteca NESTJS
    return redirect('/libro-biblioteca/new') as any;
}

export default function New() {
    const [popupOpened, setPopupOpened] = useState(false);
    useEffect(
        () => {
            setTimeout(
                () => {
                    setPopupOpened(true);
                },
                1
            )
        },
        []
    )
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
    const data = useLoaderData();
    const theme = useTheme();
    const hairlines = theme !== 'material';
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
                },
                url: {
                    mensaje: 'Ingrese solo letras'
                },
                email: {
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
            formControlName: 'number',
            help: 'Ingrese su sueldo',
            label: 'Sueldo',
            initialValue: 10.02,
            actualValue: '',
            type: CampoFormularioType.Number,
            valid: false,
            placeholder: 'EJ: 10.02',
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
        }
    ] as CampoFormularioInterface[]);
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

    const onSubmit: SubmitHandler<any> = data => {
        const formData = new FormData(document.getElementById('form'))
        fetch('/libro-biblioteca/new', {method: 'POST', body: formData})
    };
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
                                    <CamposFormulario useFormReturn={useFormReturn} campos={campos}></CamposFormulario>
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
        </>
    )
}