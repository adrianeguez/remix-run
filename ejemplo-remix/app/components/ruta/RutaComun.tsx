import {Button, Fab, List, ListItem, Page} from "konsta/react";
import NavbarTitulo from "~/components/ruta/NavbarTitulo";
import {Link, Outlet} from "@remix-run/react";
import {LibroBibliotecaMostrar} from "~/components/libro-biblioteca/LibroBibliotecaMostrar";
import PanelActionPopover from "~/components/ruta/PanelActionPopover";
import BackdropToaster from "~/components/util/backdrop-toaster";
import {RutaComunInterface} from "~/components/ruta/interfaces/ruta-comun.interface";
import {useEffect, useRef, useState} from "react";
import {CommonSortFieldsConstant} from "~/constantes/common-sort-fields.constant";
import {SortFieldInterface} from "~/interfaces/sort-field.interface";
import {SkipTakeConstant} from "~/constantes/skip-take.constant";
import {SortOrderEnum} from "~/enum/sort-order.enum";
import {convertirQueryParams} from "~/functions/http/convertir-query-params";
import {generarNavegarParametros} from "~/functions/ruta/generar-navegar-parametros";
import {SkipTakeInterface} from "~/interfaces/skip-take.interface";

export default function RutaComun<T>(props: RutaComunInterface<T>) {
    const {
        loading,
        navigateFabNewFunction,
        registrosEncontrados,
        findDto,
        sortFieldsArray,
        mostrarItemEnLista,
        navigate,
        path,
        eventoSeleccionoSort,
        mostrarFab = false
    } = props;
    const {titulo, colorTituloClase, colorClaseBanner, textoDescripcion, imagen} = props.navbar;
    // Variables locales
    const totalRegistros = registrosEncontrados[1];

    // Inicializar variables
    const [error, setError] = useState('');
    const [popoverOpened, setPopoverOpened] = useState(false);
    const popoverTargetRef = useRef(null);
    const [rightPanelOpened, setRightPanelOpened] = useState(false);
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

    // UseEffect

    useEffect(
        () => {
            if (Object.keys(sortFieldSeleccionado).length > 0) {
                eventoSeleccionoSort(sortFieldSeleccionado)
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
        setSortFieldSeleccionado(sortField);
        openPopover('.sort_action' + sortFieldSeleccionado.sortField)
    };
    const seleccionarSortFieldOrder = (sortOrder: SortOrderEnum) => {
        setPopoverOpened(false);
        setActionSortFieldOpened(false);
        setSkipTake({skip: 0, take: 0});
        setSortFieldSeleccionado({
            sortField: sortFieldSeleccionado.sortField,
            sortFieldLabel: sortFieldSeleccionado.sortFieldLabel,
            sortOrder: sortOrder
        });
    };
    const cargarMas = (siguiente: boolean) => {
        if (siguiente) {
            setSkipTake({
                skip: +skipTake.skip + +SkipTakeConstant.take,
                take: +SkipTakeConstant.take,
            });
        } else {
            setSkipTake({
                skip: +skipTake.skip - +SkipTakeConstant.take,
                take: +SkipTakeConstant.take,
            });

        }
    };
    const calcularPagina = () => {
        const paginaActual = (+skipTake.skip + +registrosEncontrados[0].length);
        return `Registros actuales ${paginaActual}/${totalRegistros}`
    }
    const navegarParametros = () => {
        navigate(`${path}?` + generarNavegarParametros(skipTake, sortFieldSeleccionado));
    };
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
                                {mostrarItemEnLista(registro, generarNavegarParametros(skipTake, sortFieldSeleccionado), indice)}
                            </div>
                        )
                    )}
                </List>
                <List>
                    <ListItem
                        className={'skip-take-page'}
                        title={calcularPagina()}
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
                        navigateFabNewFunction(generarNavegarParametros(skipTake, sortFieldSeleccionado))
                    }}
                    text="+"/>}
                <Outlet/>
            </>
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
            ></PanelActionPopover>
            <BackdropToaster loading={loading}></BackdropToaster>
        </>
    )
}