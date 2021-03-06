import {
    Actions,
    ActionsButton,
    ActionsGroup,
    ActionsLabel,
    Button, List, ListItem,
    Navbar,
    Page,
    Panel,
    Popover
} from "konsta/react";
import {SortOrderEnum} from "~/enum/sort-order.enum";
import {PanelActionPopoverInterface} from "~/components/ruta/interfaces/panel-action-popover.interface";
import CamposFormulario from "~/components/form/lib/CamposFormulario";
import {useForm} from "react-hook-form";
import {Form} from "@remix-run/react";
import {GenerateDefaultValues} from "~/functions/form/generate-default-values";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import toast from "react-hot-toast";
import {useContext, useEffect} from "react";
import {KonstaContainerContext} from "~/root";

export default function PanelActionPopover(props: PanelActionPopoverInterface) {
    const {
        setCampoFormularioAutocompleteGlobal,
        setUseFormReturnAutocompleteActual
    } = useContext(KonstaContainerContext);
    const {
        setRightPanelOpened, rightPanelOpened, actionSortFieldOpened,
        setActionSortFieldOpened, popoverOpened, popoverTargetRef,
        setPopoverOpened, sortFields, seleccionarSortField,
        seleccionarSortFieldOrder, accordeonCampos, camposFiltro,
        eventoBuscar
    } = props
    const useFormReturn = useForm<any>({
        defaultValues: {
            ...GenerateDefaultValues(camposFiltro),
        },
        mode: 'all',
    });
    const onSubmit = (data?) => {
        eventoBuscar(data);
    };
    const [
        eventoAutocomplete,
        setEventoAutocomplete,
        CampoFormularioComponente
    ] = CamposFormulario({
        useFormReturn,
        campos: camposFiltro,
        accordeonCampos
    })

    useEffect(
        () => {
            setCampoFormularioAutocompleteGlobal(eventoAutocomplete);
        },
        [eventoAutocomplete]
    )


    return (
        <>
            <Panel
                side="right"
                opened={rightPanelOpened}
                onBackdropClick={() => setRightPanelOpened(false)}
            >
                <Page>


                    <Form id="form" onSubmit={useFormReturn.handleSubmit(onSubmit)} noValidate>
                        <br/>
                        <br/>
                        <br/>
                        <Navbar
                            title="Filtros"
                            left={
                                <Button type={'button'} colors={{
                                    text: 'text-red-500',
                                    border: 'border-red-500',
                                    bg: 'bg-red-500',
                                    activeBg: 'active:bg-red-500',
                                    activeBgDark: 'active:bg-red-600',
                                }} onClick={() => setRightPanelOpened(false)}>
                                    Cerrar
                                </Button>
                            }
                            right={
                                <Button onClick={() => {
                                    setRightPanelOpened(false);
                                    toast('Buscando registros', {icon: '????'});
                                }}>
                                    Buscar
                                </Button>
                            }
                        />
                        <div className="space-y-4 p-3">
                            <div className="grid grid-cols-4 gap-1">
                                <div className={'col-span-3'}>
                                    <p className={'texto-limpiar'}>Busque y filtre registros</p>
                                </div>
                                <div className="col-start-4">
                                    <Button type={'button'} onClick={() => {
                                        useFormReturn.reset();
                                        toast('Formulario reseteado', {icon: '???'});
                                    }} className={'boton-limpiar'}><HighlightOffIcon/></Button>
                                </div>
                            </div>
                            <List className={'accordion-form-list'}>
                                {CampoFormularioComponente}
                            </List>
                        </div>
                    </Form>
                </Page>
            </Panel>
            <Actions
                opened={actionSortFieldOpened}
                onBackdropClick={() => setActionSortFieldOpened(false)}
            >
                <ActionsGroup>
                    <ActionsLabel>Seleccione un campo para ordenar</ActionsLabel>
                    {sortFields.map(
                        (sF) => (
                            <ActionsButton key={sF.sortField}
                                           className={'sort_action' + sF.sortField}
                                           bold
                                           onClick={
                                               () => seleccionarSortField(sF)
                                           }>
                                {sF.sortFieldLabel}
                            </ActionsButton>
                        )
                    )}
                    <ActionsButton
                        onClick={() => setActionSortFieldOpened(false)}
                        colors={{text: 'text-red-500'}}
                    >
                        Cancel
                    </ActionsButton>
                </ActionsGroup>
            </Actions>
            <Popover
                opened={popoverOpened}
                target={popoverTargetRef.current}
                onBackdropClick={() => setPopoverOpened(false)}
            >
                <List nested hairlines={false} colors={{bg: 'bg-transparent'}}>
                    <ListItem
                        title="Ascendentemente"
                        onClick={() => {
                            toast('Filtrando registros', {icon: '????'});
                            seleccionarSortFieldOrder(SortOrderEnum.Asc)
                        }}
                    />
                    <ListItem
                        title="Descendenente"
                        onClick={() => {
                            toast('Filtrando registros', {icon: '????'});
                            seleccionarSortFieldOrder(SortOrderEnum.Desc)
                        }}
                    />
                </List>
            </Popover>
        </>
    )
}