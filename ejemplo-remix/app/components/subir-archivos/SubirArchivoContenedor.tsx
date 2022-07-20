import {Block, Button, List, Sheet, Toolbar} from "konsta/react";
import {TipoArchivoEnum} from "~/enum/tipo-archivo.enum";
import {useState} from "react";
import {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";
import {subirArchivosImagenesForm, SubirArchivosImagenesFormInterface} from "~/http/comun/subir-archivos-imagenes.form";
import {SubmitHandler, useForm} from "react-hook-form";
import {GenerateDefaultValues} from "~/functions/form/generate-default-values";
import CamposFormulario from "~/components/form/lib/CamposFormulario";
import {Form} from "@remix-run/react";

export interface SubirArchivoContenedorProps {
    sheetOpened: boolean;
    setSheetOpened: any;
    tipoArchivo: TipoArchivoEnum;
    accept: string;
    tamanioMaximoEnBytes: number;
    eventoDioClicSubirArchivoOImagen: (dataForm:FileList)=>void;
}

export default function SubirArchivoContenedor(props: SubirArchivoContenedorProps) {
    const {sheetOpened, setSheetOpened, tipoArchivo, accept, tamanioMaximoEnBytes, children, eventoDioClicSubirArchivoOImagen} = props
    const configuracion:SubirArchivosImagenesFormInterface = {
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
    const {formState: {isValid}} = useFormReturn;
    const [eventoAutocomplete, setEventoAutocomplete, CamposFormularioComponente] = CamposFormulario({
        useFormReturn,
        campos: camposFormularioCrearEditar
    });
    const onSubmit: SubmitHandler<any> = async (dataForm) => {
        eventoDioClicSubirArchivoOImagen(dataForm)
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
                    {sheetOpened &&

                        <Form id="form" action="/libro-biblioteca/new" method="POST"
                              onSubmit={useFormReturn.handleSubmit(onSubmit)} noValidate>
                            <List>
                                {CamposFormularioComponente}
                            </List>
                            <Button className={'mb-4'} disabled={!isValid} large typeof={'submit'}>
                                Subir
                            </Button>
                        </Form>
                    }

                </div>
            </Block>
        </Sheet>
    )
}