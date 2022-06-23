import {Actions, ActionsButton, ActionsGroup, ActionsLabel, List, ListItem} from "konsta/react";
import {InputBusquedaAutocomplete} from "~/components/form/lib/InputBusquedaAutocomplete";
import {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";
import {motion} from "framer-motion";
import {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";

export default function CamposFormularioAction(props: {
    actionsOneOpened,
    cerrarAction,
    useFormAutocomplete,
    listaAutocomplete,
    setSeleccionoListaAutocomplete,
    generarComponente: {
        [key: string]: (registro: any, campoFormulario: CampoFormularioInterface) => JSX.Element;
    },
    campoFormulario: CampoFormularioInterface
}) {
    const {
        actionsOneOpened,
        cerrarAction,
        useFormAutocomplete,
        listaAutocomplete,
        setSeleccionoListaAutocomplete,
        generarComponente,
        campoFormulario
    } = props;
    return (
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
                            (v: any, index) => (
                                <motion.div
                                    initial={{opacity: 0, y: 10}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: 0}}
                                    transition={{delay: index * 0.1}}
                                    key={v.id}
                                    onClick={() => {
                                        cerrarAction();
                                        setSeleccionoListaAutocomplete({registro:v, campoFormulario});
                                    }}
                                >
                                    {generarComponente[campoFormulario.formControlName](v, campoFormulario)}
                                </motion.div>
                            )
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
    )
}