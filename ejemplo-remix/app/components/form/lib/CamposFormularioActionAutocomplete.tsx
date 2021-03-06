import {Actions, ActionsButton, ActionsGroup, ActionsLabel, List, ListItem} from "konsta/react";
import {InputBusquedaAutocomplete} from "~/components/form/lib/InputBusquedaAutocomplete";
import {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";
import {motion} from "framer-motion";
import {
    CampoFormularioActionAutocompleteInterface
} from "~/components/form/lib/interfaces/campo-formulario-action-autocomplete.interface";

export default function CamposFormularioActionAutocomplete(props: CampoFormularioActionAutocompleteInterface) {
    const {
        actionsOneOpened,
        useFormAutocomplete,
        listaAutocomplete,
        setSeleccionoListaAutocomplete,
        generarComponente,
        campoFormulario,
        setListaAutocomplete,
        setEventoAutocomplete,
        setActionsOneOpened,
    } = props;

    const cerrarAction = () => {
        setListaAutocomplete([]);
        // setEventoAutocomplete({} as any);
        setActionsOneOpened(false);
        useFormAutocomplete.setValue('busqueda' as any, '' as any, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        } as any)
    }
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
                        {listaAutocomplete && listaAutocomplete.length === 0 &&
                            <ListItem title={'0 Registros encontrados'}/>
                        }
                    </List>
                    <List className={'action-list-konstaio'}>
                        {listaAutocomplete && listaAutocomplete.map(
                            (v: any, index) => (
                                <motion.div
                                    initial={{opacity: 0, y: 10}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: 0}}
                                    transition={{delay: index * 0.1}}
                                    key={v.id}
                                    onClick={() => {
                                        setSeleccionoListaAutocomplete({registro: v, campoFormulario});
                                        // cerrarAction();
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