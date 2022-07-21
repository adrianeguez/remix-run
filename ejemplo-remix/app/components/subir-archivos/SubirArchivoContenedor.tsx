import {Block, Button, List, Sheet, Toolbar} from "konsta/react";
import {TipoArchivoEnum} from "~/enum/tipo-archivo.enum";
import {useState} from "react";
import {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";
import {subirArchivosImagenesForm, SubirArchivosImagenesFormInterface} from "~/http/comun/subir-archivos-imagenes.form";
import {SubmitHandler, useForm} from "react-hook-form";
import {GenerateDefaultValues} from "~/functions/form/generate-default-values";
import CamposFormulario from "~/components/form/lib/CamposFormulario";
import {Form} from "@remix-run/react";
import {DescargarArchivoBase64Function} from "~/functions/util/descargar-archivo-base64.function";
import MostrarSisImagen from "~/components/imagenes/MostrarSisImagen";

export interface SubirArchivoContenedorProps {
    sheetOpened: boolean;
    setSheetOpened: any;
    tipoArchivo: TipoArchivoEnum;
    accept: string;
    tamanioMaximoEnBytes: number;
    eventoDioClicSubirArchivoOImagen: (dataForm?: FileList) => void;
    registroSeleccionadoRuta: any;
}

export default function SubirArchivoContenedor(props: SubirArchivoContenedorProps) {
    const {
        sheetOpened, setSheetOpened,
        tipoArchivo, accept, tamanioMaximoEnBytes,
        children, eventoDioClicSubirArchivoOImagen, registroSeleccionadoRuta
    } = props
    const configuracion: SubirArchivosImagenesFormInterface = {
        tipoArchivo, accept, tamanioMaximoEnBytes
    }
    const [camposFormularioCrearEditar, setCamposFormularioCrearEditar] = useState(
        [...subirArchivosImagenesForm(configuracion)] as CampoFormularioInterface[]
    );

    const useFormReturn = useForm<any>({
        defaultValues: {
            ...GenerateDefaultValues(camposFormularioCrearEditar),
        },
        mode: 'all',
    });
    const {formState: {isValid}, reset} = useFormReturn;
    const [eventoAutocomplete, setEventoAutocomplete, CamposFormularioComponente] = CamposFormulario({
        useFormReturn,
        campos: camposFormularioCrearEditar
    });
    const onSubmit: SubmitHandler<any> = async (dataForm) => {
        eventoDioClicSubirArchivoOImagen(dataForm['archivoImagen'])
    };
    return (
        <Sheet
            className="pb-safe sheet-visualizar w-100"
            opened={sheetOpened}
            onBackdropClick={() => setSheetOpened(false)}
        >
            <Toolbar top>
                <div className="left"/>
                <div className="right">
                    <Button type={'button'} colors={{
                        text: 'text-red-500',
                        border: 'border-red-500',
                        bg: 'bg-red-500',
                        activeBg: 'active:bg-red-500',
                        activeBgDark: 'active:bg-red-600',
                    }} onClick={() => setSheetOpened(false)}>
                        Cerrar
                    </Button>
                </div>
            </Toolbar>
            <Block>
                <div className="mt-4">
                    {children}
                    {
                        registroSeleccionadoRuta.sisImagen && tipoArchivo === TipoArchivoEnum.Imagen &&
                        <>
                            <div className="grid grid-rows-1 content-center">
                                <div className="row-span-1 md:row-span-1 p-3">
                                    <MostrarSisImagen registro={registroSeleccionadoRuta} claseCss={''}/>
                                </div>
                            </div>
                        </>
                    }
                    {sheetOpened &&

                        <Form id="form" action="/libro-biblioteca/new" method="POST"
                              onSubmit={useFormReturn.handleSubmit(onSubmit)} noValidate>
                            <List>
                                {CamposFormularioComponente}
                            </List>
                            <div className="grid grid-rows-2 grid-flow-col gap-4">
                                <div className="row-span-1 md:row-span-2 p-3">
                                    {
                                        registroSeleccionadoRuta.sisArchivo && tipoArchivo === TipoArchivoEnum.Archivo &&
                                        <Button className={'mb-4'}
                                                onClick={
                                                    () => {
                                                        DescargarArchivoBase64Function(registroSeleccionadoRuta, tipoArchivo);
                                                        setSheetOpened(false);
                                                        eventoDioClicSubirArchivoOImagen();
                                                    }
                                                }>
                                            Descargar
                                            ...{registroSeleccionadoRuta.sisArchivo.originalname.substring(registroSeleccionadoRuta.sisArchivo.originalname.length - 15)}
                                        </Button>
                                    }
                                    {
                                        registroSeleccionadoRuta.sisImagen && tipoArchivo === TipoArchivoEnum.Imagen &&
                                        <Button className={'mb-4'}
                                                onClick={
                                                    () => {
                                                        DescargarArchivoBase64Function(registroSeleccionadoRuta, tipoArchivo);
                                                        setSheetOpened(false);
                                                        eventoDioClicSubirArchivoOImagen();
                                                    }
                                                }>
                                            Descargar
                                            ...{registroSeleccionadoRuta.sisImagen.originalname.substring(registroSeleccionadoRuta.sisImagen.originalname.length - 15)}
                                        </Button>
                                    }

                                </div>
                                <div className="row-span-1 md:row-span-2 p-3">
                                    <Button className={'mb-4'} disabled={!isValid} typeof={'submit'}>
                                        Subir
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    }

                </div>
            </Block>
        </Sheet>
    )
}