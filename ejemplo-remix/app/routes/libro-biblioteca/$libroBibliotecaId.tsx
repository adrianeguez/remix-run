import type {ActionFunction} from "@remix-run/node";
import {LoaderFunction, redirect} from "@remix-run/node";
import {
    LibroBibliotecaCrearEditarLoader,
    LibroBibliotecaCrearEditarLoaderData
} from "~/http/libro-biblioteca/libro-biblioteca-crear-editar.loader";
import {LibroBibliotecaCrearEditarAction} from "~/http/libro-biblioteca/libro-biblioteca-crear-editar.action";
import PopUpContenedor from "~/components/util/PopUpContenedor";
import {BlockTitle, Button, List} from "konsta/react";
import {Form, useLoaderData, useNavigate} from "@remix-run/react";
import {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";
import {useContext, useEffect, useState} from "react";
import {motion} from "framer-motion";
import {convertirQueryParams} from "~/functions/http/convertir-query-params";
import {SubmitHandler, useForm} from "react-hook-form";
import {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";
import {LibroBibliotecaForm} from "~/http/libro-biblioteca/form/libro-biblioteca.form";
import {GenerateDefaultValues} from "~/functions/form/generate-default-values";
import CamposFormulario from "~/components/form/lib/CamposFormulario";
import {KonstaContainerContext} from "~/root";
import toast from "react-hot-toast";
import {LibroBibliotecaEnum} from "~/http/libro-biblioteca/form/libro-biblioteca.enum";
import {FormularioComunEnum} from "~/enum/formulario-comun.enum";

// Loader
export const loader: LoaderFunction = LibroBibliotecaCrearEditarLoader;
// Action
export const action: ActionFunction = LibroBibliotecaCrearEditarAction

export default function libroBibliotecaId() {
    // Hooks
    const navigate = useNavigate();
    const path = '/libro-biblioteca';
    const data: LibroBibliotecaCrearEditarLoaderData = useLoaderData();
    let estaEditando: LibroBibliotecaInterface | undefined;
    if (data.registro) {
        estaEditando = data.registro[0][0];
    }
    const camposFormulario: CampoFormularioInterface[] = [...LibroBibliotecaForm()]
        .map(
            (campo) => {
                if (estaEditando) {
                    if (campo.formControlName === LibroBibliotecaEnum.Nombre) {
                        campo.initialValue = estaEditando.nombre
                    }
                    if (campo.formControlName === FormularioComunEnum.SisHabilitado) {
                        campo.initialValue = estaEditando.sisHabilitado
                    }
                }
                return campo;
            }
        );
    const {
        setLoading,
    } = useContext(KonstaContainerContext);


    // Inicializar variables
    const [popupOpened, setPopupOpened] = useState(false);
    const [camposFormularioCrearEditar, setCamposFormularioCrearEditar] = useState(
        [...camposFormulario] as CampoFormularioInterface[]
    );

    const useFormReturn = useForm<any>({
        defaultValues: {
            ...GenerateDefaultValues(camposFormularioCrearEditar),
        },
        mode: 'all',
    });
    const {formState: {isValid}} = useFormReturn;

    // Custom Hooks
    // Custom Hooks - Campo Formulario
    const [eventoAutocomplete, setEventoAutocomplete, CamposFormularioComponente] = CamposFormulario({
        useFormReturn,
        campos: camposFormularioCrearEditar
    });

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
        },
        []
    )
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
            if (estaEditando && data.registro) {
                formData.set('id', data.registro[0][0].id)
            }
            const respuesta = await fetch(`/libro-biblioteca/new?${convertirQueryParams(data.findDto)}`, {
                method: 'POST',
                body: formData
            })
            if (respuesta.redirected) {
                window.location.replace(respuesta.url);
                setLoading(false);
            } else {
                if (respuesta.status === 400) {
                    setLoading(false);
                    toast('Parametros para peticion incorrectos', {icon: '⛔'});
                    console.error({error: respuesta, mensaje: 'Error creando nuevo registro'});
                } else {
                    setLoading(false);
                    toast.error('Error del servidor');
                    console.error({error: respuesta, mensaje: 'Error creando nuevo registro'});
                }
            }
        } catch (error) {
            setLoading(false);
            toast.error('Error del servidor');
            console.error({error, mensaje: 'Error creando nuevo registro'});
        }
    };

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
                <PopUpContenedor popupOpened={popupOpened} estaEditando={estaEditando} eventoSalir={salir}>

                    <Form id="form" action="/libro-biblioteca/new" method="POST"
                          onSubmit={useFormReturn.handleSubmit(onSubmit)} noValidate>
                        <BlockTitle>Ingrese un nuevo Libro Biblioteca</BlockTitle>
                        <br/>
                        <div className="space-y-4 popup-modal m-4">
                            <List hairlines={true}>
                                {CamposFormularioComponente}
                            </List>

                        </div>
                        <Button className={'mb-4'} disabled={!isValid} large typeof={'submit'}>
                            {estaEditando ? 'Editar' : 'Crear'}
                        </Button>
                    </Form>
                </PopUpContenedor>
            </motion.div>
        </>
    )
}