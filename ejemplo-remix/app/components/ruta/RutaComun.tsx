import {Actions, ActionsButton, ActionsGroup, ActionsLabel, Button, Fab, List, ListItem} from "konsta/react";
import NavbarTitulo from "~/components/ruta/NavbarTitulo";
import {Outlet} from "@remix-run/react";
import PanelActionPopover from "~/components/ruta/PanelActionPopover";
import {RutaComunInterface} from "~/components/ruta/interfaces/ruta-comun.interface";
import {useContext, useEffect, useRef, useState} from "react";
import {SortFieldInterface} from "~/interfaces/sort-field.interface";
import {SkipTakeConstant} from "~/constantes/skip-take.constant";
import {SortOrderEnum} from "~/enum/sort-order.enum";
import {SkipTakeInterface} from "~/interfaces/skip-take.interface";
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import {KonstaContainerContext} from "~/root";

export default function RutaComun<T, F>(props: RutaComunInterface<T, F>) {
    const {
        navigateFabNewFunction,
        registrosEncontrados,
        findDto,
        sortFieldsArray,
        mostrarItemEnLista,
        navigate,
        path,
        eventoSeleccionoSort,
        mostrarFab = false,
        camposFiltro,
        accordeonCamposFiltro,
        eventoBuscar,
    } = props;

    const {titulo, colorTituloClase, colorClaseBanner, textoDescripcion, imagen} = props.navbar;
    // Variables locales
    const totalRegistros = registrosEncontrados[1];

    // Inicializar variables
    const [rightPanelOpened, setRightPanelOpened] = useState(false);
    const [error, setError] = useState('');
    const [popoverOpened, setPopoverOpened] = useState(false);
    const popoverTargetRef = useRef(null);
    // const [rightPanelOpened, setRightPanelOpened] = useState(false);
    const [sortFields, setSortFields] = useState([...sortFieldsArray] as SortFieldInterface[]);
    const [sortFieldSeleccionado, setSortFieldSeleccionado] = useState({
        sortField: findDto.sortField ? findDto.sortField : '',
        sortOrder: findDto.sortOrder ? findDto.sortOrder : '',
        sortFieldLabel: findDto.sortField ? findDto.sortField : ''
    } as SortFieldInterface);
    const [actionSortFieldOpened, setActionSortFieldOpened] = useState(false);
    const [skipTake, setSkipTake] = useState({
            skip: findDto.skip ? findDto.skip : 0,
            take: findDto.take ? findDto.take : SkipTakeConstant.take,
        } as SkipTakeInterface
    );
    const [opcionNumeroRegistrosAbierto, setOpcionNumeroRegistrosAbierto] = useState(false);

    // UseEffect
    useEffect(
        () => {
            if (Object.keys(sortFieldSeleccionado).length > 0) {
                eventoSeleccionoSort(sortFieldSeleccionado, skipTake)
            }
        },
        [sortFieldSeleccionado]
    )
    useEffect(
        () => {
            if (Object.keys(skipTake).length > 0) {
                eventoSeleccionoSort(sortFieldSeleccionado, skipTake)
            }
        },
        [skipTake]
    )

    // Funciones UI
    const openPopover = (targetRef) => {
        popoverTargetRef.current = targetRef;
        setPopoverOpened(true);
    };
    const seleccionarSortField = (sortField: SortFieldInterface) => {
        setSortFieldSeleccionado({
            sortField: sortField.sortField,
            sortFieldLabel: sortField.sortFieldLabel,
            sortOrder: sortFieldSeleccionado.sortOrder
        });
        openPopover('.sort_action' + sortFieldSeleccionado.sortField)
    };
    const seleccionarSortFieldOrder = (sortOrder: SortOrderEnum) => {
        setPopoverOpened(false);
        setActionSortFieldOpened(false);
        setSortFieldSeleccionado({
            sortField: sortFieldSeleccionado.sortField,
            sortFieldLabel: sortFieldSeleccionado.sortFieldLabel,
            sortOrder: sortOrder
        });
    };
    const cargarMas = (siguiente: boolean) => {
        if (siguiente) {
            setSkipTake({
                skip: +skipTake.skip + +skipTake.take,
                take: +skipTake.take,
            });
        } else {
            setSkipTake({
                skip: +skipTake.skip - +skipTake.take,
                take: +skipTake.take,
            });

        }
    };
    const calcularPagina = () => {
        const paginaActual = (+skipTake.skip + +registrosEncontrados[0].length);
        return `Registros ${paginaActual}/${totalRegistros}`
    }
    const seleccionoNuevoTake = (take: number) => {
        setOpcionNumeroRegistrosAbierto(false);
        setSkipTake({
            skip: 0,
            take,
        })
    }

    return (
        <>

            <>
                <NavbarTitulo sortFieldSeleccionado={sortFieldSeleccionado}
                              setRightPanelOpened={setRightPanelOpened}
                              setActionSortFieldOpened={setActionSortFieldOpened}
                              titulo={titulo}
                              colorClaseBanner={colorClaseBanner as string}
                              imagen={imagen as string}
                              colorTituloClase={colorTituloClase as string}
                              textoDescripcion={textoDescripcion as string}

                />
                <List>
                    {registrosEncontrados[0].map(
                        (registro, indice) => (
                            <div key={indice + Date.now()}>
                                {mostrarItemEnLista(registro, indice)}
                            </div>
                        )
                    )}
                </List>
                <List>
                    <ListItem
                        className={'skip-take-page'}
                        title={(<>
                            <div className={'grid grid-cols-2 gap-4'}>
                                <div>
                                    <span> {calcularPagina()}</span>
                                </div>
                                <div>
                                    <Button onClick={() => setOpcionNumeroRegistrosAbierto(true)}>
                                        {skipTake.take}
                                        <AutoAwesomeMotionIcon
                                            className={'ml-1'}/></Button>
                                </div>
                            </div>
                        </>) as any}
                    />
                </List>
                <div className="grid grid-cols-2 gap-x-6">

                    {+skipTake.skip > 0 && <Button onClick={() => cargarMas(false)}>Anterior</Button>}
                    {+skipTake.skip === 0 && <Button disabled={true} aria-disabled={true} style={{
                        opacity: 0.2,
                        pointerEvents: 'none'
                    }}>Anterior</Button>}
                    {(+skipTake.skip + +skipTake.take) < totalRegistros &&
                        <Button onClick={() => cargarMas(true)}>Siguiente</Button>}
                    {(+skipTake.skip + +skipTake.take) >= totalRegistros &&
                        <Button disabled={true} style={{
                            opacity: 0.2,
                            pointerEvents: 'none'
                        }}>Siguiente</Button>}
                </div>
                {mostrarFab && <Fab
                    className="fixed right-4-safe bottom-4-safe z-20 fab-opened"
                    onClick={() => {
                        navigateFabNewFunction()
                    }}
                    text="+"/>}
                <Outlet/>
            </>
            <Actions
                opened={opcionNumeroRegistrosAbierto}
                onBackdropClick={() => setOpcionNumeroRegistrosAbierto(false)}
            >
                <ActionsGroup>
                    <ActionsLabel>Seleccione numero de registros</ActionsLabel>
                    {SkipTakeConstant.registros.map((valor) => (
                        <ActionsButton key={valor} onClick={() => seleccionoNuevoTake(valor)} bold>
                            {valor}
                        </ActionsButton>))}
                </ActionsGroup>
                <ActionsGroup>
                    <ActionsButton
                        onClick={() => setOpcionNumeroRegistrosAbierto(false)}
                        colors={{text: 'text-red-500'}}
                    >
                        Cancelar
                    </ActionsButton>
                </ActionsGroup>
            </Actions>
            <PanelActionPopover actionSortFieldOpened={actionSortFieldOpened}
                                popoverOpened={popoverOpened}
                                popoverTargetRef={popoverTargetRef}
                                setActionSortFieldOpened={setActionSortFieldOpened}
                                rightPanelOpened={rightPanelOpened}
                                setPopoverOpened={setPopoverOpened}
                                seleccionarSortField={seleccionarSortField}
                                seleccionarSortFieldOrder={seleccionarSortFieldOrder}
                                setRightPanelOpened={setRightPanelOpened}
                                sortFields={sortFields}
                                camposFiltro={camposFiltro}
                                accordeonCampos={accordeonCamposFiltro as any}
                                eventoBuscar={eventoBuscar}
            ></PanelActionPopover>
        </>
    )
}