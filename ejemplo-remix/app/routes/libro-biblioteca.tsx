import KonstaContainer from "~/components/KonstaContainer";
import type {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";
import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {Link, Outlet, useLoaderData, useNavigate} from "@remix-run/react";
import {Button, Fab, List, ListItem, Page} from "konsta/react";
import {useEffect, useRef, useState} from "react";
import {LibroBibliotecaMostrar} from "~/components/libro-biblioteca/LibroBibliotecaMostrar";
import {LibroBibliotecaInstanceHttp} from "~/http/libro-biblioteca/libro-biblioteca-instance.http";
import toast from "react-hot-toast";
import {CommonSortFieldsConstant} from "~/constantes/common-sort-fields.constant";
import {SortFieldInterface} from "~/interfaces/sort-field.interface";
import {SortOrderEnum} from "~/enum/sort-order.enum";
import {LibroBibliotecaFindDto} from "~/http/libro-biblioteca/dto/libro-biblioteca-find.dto";
import {convertirQueryParams} from "~/functions/http/convertir-query-params";
import {eliminarUndNullVacio} from "~/functions/util/eliminar-und-null-vacio";
import NavbarTitulo from "~/components/ruta/NavbarTitulo";
import BackdropToaster from "~/components/util/backdrop-toaster";
import PanelActionPopover from "~/components/ruta/PanelActionPopover";
import {SkipTakeConstant} from "~/constantes/skip-take.constant";

type LoaderData = {
    librosBiblioteca?: [LibroBibliotecaInterface[], number],
    error?: string,
    mensaje?: string;
    findDto?: LibroBibliotecaFindDto;
};
export const loader: LoaderFunction = async ({request}) => {
    const returnData: LoaderData = {
        librosBiblioteca: undefined,
        error: undefined,
        mensaje: undefined,
        findDto: undefined
    };
    const findDto: LibroBibliotecaFindDto = {sortOrder: undefined, sortField: undefined};
    const url = new URL(request.url);
    returnData.mensaje = url.searchParams.get("mensaje") as string;
    // Setear findDTO
    findDto.sortField = url.searchParams.get("sortField") as string;
    findDto.sortOrder = url.searchParams.get("sortOrder") as SortOrderEnum;
    if(!findDto.sortOrder && !findDto.sortField){
        findDto.sortField = 'sisCreado';
        findDto.sortOrder = SortOrderEnum.Desc;
    }

    findDto.skip = url.searchParams.get("skip") as string;
    if (!findDto.skip) {
        findDto.skip = 0 + '';
    }
    findDto.take = url.searchParams.get("take") as string;
    if (!findDto.take) {
        findDto.take = SkipTakeConstant.take.toString();
    }
    returnData.findDto = findDto;
    try {
        returnData.librosBiblioteca = await LibroBibliotecaInstanceHttp.find(eliminarUndNullVacio(findDto))
    } catch (error: any) {
        returnData.error = error;
    }
    return json(returnData);
};
export default function Index() {
    // Hooks Librearias
    const data = useLoaderData<LoaderData>();
    const navigate = useNavigate();
    let totalRegistros = 0;
    if (data.librosBiblioteca) {
        totalRegistros = data.librosBiblioteca[1];
    }

    // Inicializar variables
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [popoverOpened, setPopoverOpened] = useState(false);
    const popoverTargetRef = useRef(null);
    const [rightPanelOpened, setRightPanelOpened] = useState(false);
    const [sortFields, setSortFields] = useState([...CommonSortFieldsConstant] as SortFieldInterface[]);
    const [sortFieldSeleccionado, setSortFieldSeleccionado] = useState({} as SortFieldInterface);
    const [actionSortFieldOpened, setActionSortFieldOpened] = useState(false);
    const [skipTake, setSkipTake] = useState({
            skip: data.findDto ? data.findDto.skip : 0,
            take: data.findDto ? data.findDto.take : SkipTakeConstant.take,
        }
    );


    const path = '/libro-biblioteca';

    // Funciones Util
    const toastInfo = (mensaje) => {
        toast(mensaje, {
            icon: '📑'
        })
    };

    // Use Effects
    // Use Effect - Componente inicializado
    useEffect(
        () => {
            if (data.error) {
                setError('Error obteniendo registros');
                toast.error('Error del servidor');
            }
            if (data.mensaje) {
                toast.success(data.mensaje);
            } else {
                toast.success('Cargo datos exitosamente');
            }
        }, []
    )
    useEffect(
        () => {
            if (Object.keys(sortFieldSeleccionado).length > 0) {
                navegarParametros();
            }
        },
        [sortFieldSeleccionado]
    )
    useEffect(
        () => {
            if (skipTake.skip !== 0 && skipTake.take !== 0) {
                navegarParametros();
            } else {
                if (skipTake.take > 0 && skipTake.skip >= 0) {
                    navegarParametros();
                }
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
        openPopover('.sort_action' + sortField.sortField)
    };
    const seleccionarSortFieldOrder = (sortOrder: SortOrderEnum) => {
        setSortFieldSeleccionado({
            sortField: sortFieldSeleccionado.sortField,
            sortFieldLabel: sortFieldSeleccionado.sortFieldLabel,
            sortOrder: sortOrder
        });
        setPopoverOpened(false);
        setActionSortFieldOpened(false);
    };

    const navegarParametros = () => {
        const skipTakeLocal = {
            skip: 0,
            take: 0,
        }
        if (skipTake.skip === 0 && skipTake.take === 0) {
            skipTakeLocal.take = SkipTakeConstant.take;
        } else {
            skipTakeLocal.skip = skipTake.skip;
            skipTakeLocal.take = skipTake.take;
        }
        const queryParams = convertirQueryParams({...sortFieldSeleccionado, ...skipTakeLocal});
        navigate(`${path}?${queryParams}`);
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
        if (data.librosBiblioteca) {
            const paginaActual = (+skipTake.skip + +data.librosBiblioteca[0].length);
            return `Registros actuales ${paginaActual}/${totalRegistros}`
        }
        return ``
    }
    return (
        <KonstaContainer titulo="Libro biblioteca">
            <Page>
                <br/>
                <br/>
                <br/>
                <NavbarTitulo sortFieldSeleccionado={sortFieldSeleccionado}
                              setRightPanelOpened={setRightPanelOpened}
                              setActionSortFieldOpened={setActionSortFieldOpened}
                              titulo={'Libro Biblioteca'}
                ></NavbarTitulo>
                <List>
                    {data.librosBiblioteca && data.librosBiblioteca[0].map(
                        (libro) => (
                            <Link key={libro.id} to={`/libro-biblioteca/${libro.id}`}>
                                <LibroBibliotecaMostrar registro={libro}></LibroBibliotecaMostrar>
                            </Link>
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
                    {(+skipTake.skip + +skipTake.take) <= totalRegistros &&
                        <Button onClick={() => cargarMas(true)}>Siguiente</Button>}
                    {(+skipTake.skip + +skipTake.take) > totalRegistros &&
                        <Button disabled={true} style={{
                            opacity: 0.2,
                            pointerEvents: 'none'
                        }}>Siguiente</Button>}
                </div>
                <Fab
                    className="fixed right-4-safe bottom-4-safe z-20 fab-opened"
                    onClick={() => {
                        navigate({pathname: "/libro-biblioteca/new"})
                    }}
                    text="+"/>
                <Outlet/>
            </Page>
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
        </KonstaContainer>
    )
}