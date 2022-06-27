import {
    Actions,
    ActionsButton,
    ActionsGroup,
    ActionsLabel,
    Block,
    Button, List, ListItem,
    Navbar,
    Page,
    Panel,
    Popover
} from "konsta/react";
import {SortOrderEnum} from "~/enum/sort-order.enum";
import {PanelActionPopoverInterface} from "~/components/ruta/interfaces/panel-action-popover.interface";

export default function PanelActionPopover(props: PanelActionPopoverInterface) {
    const {
        setRightPanelOpened, rightPanelOpened, actionSortFieldOpened,
        setActionSortFieldOpened, popoverOpened, popoverTargetRef,
        setPopoverOpened, sortFields, seleccionarSortField,
        seleccionarSortFieldOrder
    } = props
    return (
        <>
            <Panel
                side="right"
                opened={rightPanelOpened}
                onBackdropClick={() => setRightPanelOpened(false)}
            >
                <Page>
                    <br/>
                    <br/>
                    <br/>
                    <Navbar
                        title="Filtros"
                        right={
                            <Button onClick={() => setRightPanelOpened(false)}>
                                Buscar
                            </Button>
                        }

                        left={
                            <Button colors={{
                                text: 'text-red-500',
                                border: 'border-red-500',
                                bg: 'bg-red-500',
                                activeBg: 'active:bg-red-500',
                                activeBgDark: 'active:bg-red-600',
                            }} onClick={() => setRightPanelOpened(false)}>
                                Cerrar
                            </Button>
                        }
                    />
                    <Block className="space-y-4">
                        <p>Here comes right panel.</p>

                    </Block>
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
                            seleccionarSortFieldOrder(SortOrderEnum.Asc)
                        }}
                    />
                    <ListItem
                        title="Descendenente"
                        onClick={() => {
                            seleccionarSortFieldOrder(SortOrderEnum.Desc)
                        }}
                    />
                </List>
            </Popover>
        </>
    )
}