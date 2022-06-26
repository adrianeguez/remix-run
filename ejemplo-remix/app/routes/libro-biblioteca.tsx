import KonstaContainer from "~/components/KonstaContainer";
import type {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";
import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {Link, Outlet, useLoaderData, useNavigate} from "@remix-run/react";
import {
    Actions,
    ActionsButton,
    ActionsGroup,
    ActionsLabel,
    Block,
    Button,
    Fab,
    Icon,
    List,
    ListItem,
    Navbar,
    Page,
    Panel,
    Popover
} from "konsta/react";
import {useEffect, useRef, useState} from "react";
import {LibroBibliotecaMostrar} from "~/components/libro-biblioteca/LibroBibliotecaMostrar";
import {LibroBibliotecaInstanceHttp} from "~/http/libro-biblioteca/libro-biblioteca-instance.http";
import toast, {Toaster} from "react-hot-toast";
import {CommonSortFieldsConstant} from "~/constantes/common-sort-fields.constant";
import {SortFieldInterface} from "~/interfaces/sort-field.interface";
import {SortOrderEnum} from "~/enum/sort-order.enum";
import {LibroBibliotecaFindDto} from "~/http/libro-biblioteca/dto/libro-biblioteca-find.dto";
import {convertirQueryParams} from "~/functions/http/convertir-query-params";
import {eliminarUndNullVacio} from "~/functions/util/eliminar-und-null-vacio";
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import NavbarTitulo from "~/components/ruta/NavbarTitulo";

type LoaderData = { librosBiblioteca?: [LibroBibliotecaInterface[], number], error?: string, mensaje?: string; };
export const loader: LoaderFunction = async ({request}) => {
    console.log('QUE CHUCHA', request);
    const returnData: LoaderData = {
        librosBiblioteca: undefined,
        error: undefined,
        mensaje: undefined,
    };
    const findDto: LibroBibliotecaFindDto = {sortOrder: undefined, sortField: undefined};
    const url = new URL(request.url);
    returnData.mensaje = url.searchParams.get("mensaje") as string;
    // Setear findDTO
    findDto.sortField = url.searchParams.get("sortField") as string;
    findDto.sortOrder = url.searchParams.get("sortOrder") as SortOrderEnum;
    console.log('findDto', findDto);
    try {
        returnData.librosBiblioteca = await LibroBibliotecaInstanceHttp.find(eliminarUndNullVacio(findDto))
    } catch (error: any) {
        returnData.error = error;
    }
    return json(returnData);
};
export default function Index() {
    // Inicializar variables
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [popoverOpened, setPopoverOpened] = useState(false);
    const popoverTargetRef = useRef(null);
    const [rightPanelOpened, setRightPanelOpened] = useState(false);
    const [sortFields, setSortFields] = useState([...CommonSortFieldsConstant] as SortFieldInterface[]);
    const [sortFieldSeleccionado, setSortFieldSeleccionado] = useState({} as SortFieldInterface);
    const [actionSortFieldOpened, setActionSortFieldOpened] = useState(false);

    const path = '/libro-biblioteca';

    // Hooks Librearias
    const data = useLoaderData<LoaderData>();
    const navigate = useNavigate();

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
            console.log('data', data);
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
            navegarParametros();
        },
        [sortFieldSeleccionado]
    )

    // Funciones UI
    const openPopover = (targetRef) => {
        console.log('targetRef', targetRef);
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
        const queryParams = convertirQueryParams(sortFieldSeleccionado);
        navigate(`${path}?${queryParams}`);
    }
    return (
        <KonstaContainer titulo="Libro biblioteca">
            <Page>
                <br/>
                <br/>
                <br/>
                <Navbar
                    className={'navbar-ruta'}
                    style={{backgroundColor: '#7070a7'}}
                    title={
                        <NavbarTitulo titulo={'Libro biblioteca'}/> as any
                    }

                    left={
                        <Icon
                            className={'badge-sort-order icon-medium'}
                            badge={sortFieldSeleccionado.sortFieldLabel}
                            badgeColors={{bg: 'bg-red-500'}}
                            onClick={() => setActionSortFieldOpened(true)}
                        >
                            {sortFieldSeleccionado.sortOrder === SortOrderEnum.Desc ?
                                <ArrowDownwardSharpIcon className={'icon-medium'}/> :
                                <ArrowUpwardSharpIcon className={'icon-medium'}/>
                            }
                        </Icon>

                    }
                    right={
                        <Icon
                            badge="filtros"
                            badgeColors={{bg: 'bg-red-500'}}
                            onClick={() => setRightPanelOpened(true)}
                        ><img className={'icon-medium'} src="https://cdn-icons-png.flaticon.com/512/107/107799.png"
                              alt=""/></Icon>
                    }
                />
                <p class={'text-center'}>Registre</p>
                <List>
                    {data.librosBiblioteca && data.librosBiblioteca[0].map(
                        (libro) => (
                            <Link key={libro.id} to={`/libro-biblioteca/${libro.id}`}>
                                <LibroBibliotecaMostrar registro={libro}></LibroBibliotecaMostrar>
                            </Link>
                        )
                    )}
                </List>
                <Popover
                    opened={popoverOpened}
                    target={popoverTargetRef.current}
                    onBackdropClick={() => setPopoverOpened(false)}
                >
                    <List nested hairlines={false} colors={{bg: 'bg-transparent'}}>
                        <ListItem
                            title="Create"
                            className={'text-center w-100'}
                            link
                            onClick={() => setPopoverOpened(false)}
                        />
                        <ListItem
                            title="Refresh"
                            link
                            onClick={() => setPopoverOpened(false)}
                        />
                    </List>
                </Popover>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                <Fab
                    className="fixed right-4-safe bottom-4-safe z-20 fab-opened"
                    onClick={() => {
                        // openPopover('.fab-opened')
                        navigate({pathname: "/libro-biblioteca/new"})
                    }}
                    text="+"/>
                <Outlet/>
            </Page>
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
                        <p>
                            Duis ut mauris sollicitudin, venenatis nisi sed, luctus ligula.
                            Phasellus blandit nisl ut lorem semper pharetra. Nullam tortor
                            nibh, suscipit in consequat vel, feugiat sed quam. Nam risus
                            libero, auctor vel tristique ac, malesuada ut ante. Sed molestie,
                            est in eleifend sagittis, leo tortor ullamcorper erat, at
                            vulputate eros sapien nec libero. Mauris dapibus laoreet nibh quis
                            bibendum. Fusce dolor sem, suscipit in iaculis id, pharetra at
                            urna. Pellentesque tempor congue massa quis faucibus. Vestibulum
                            nunc eros, convallis blandit dui sit amet, gravida adipiscing
                            libero.
                        </p>
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
        </KonstaContainer>
    )
}