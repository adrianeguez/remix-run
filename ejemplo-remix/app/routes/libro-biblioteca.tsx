import KonstaContainer from "~/components/KonstaContainer";
import type {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";
import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {LibroBibliotecaHttp} from "~/http/libro-biblioteca/libro-biblioteca.http";
import {Link, useLoaderData, useNavigate} from "@remix-run/react";
import {Badge, Block, Fab, Icon, List, ListItem, Navbar, Page, Panel, Popover, Popup} from "konsta/react";
import {useEffect, useRef, useState} from "react";
import {Outlet} from "@remix-run/react";
import {LibroBibliotecaMostrar} from "~/components/libro-biblioteca/LibroBibliotecaMostrar";
import {LibroBibliotecaInstanceHttp} from "~/http/libro-biblioteca/libro-biblioteca-instance.http";
import {Backdrop, CircularProgress} from "@mui/material";
import {BackdropConstant} from "~/constantes/backdrop.constant";
import toast, {Toaster} from "react-hot-toast";

type LoaderData = { librosBiblioteca?: [LibroBibliotecaInterface[], number], error?: string, mensaje?: string; };
export const loader: LoaderFunction = async ({request}) => {
    const returnData: LoaderData = {
        librosBiblioteca: undefined,
        error: undefined,
        mensaje: undefined,
    };
    const url = new URL(request.url);
    returnData.mensaje = url.searchParams.get("mensaje") as string;
    try {
        returnData.librosBiblioteca = await LibroBibliotecaInstanceHttp.find()
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
            }
        }, []
    )
    const openPopover = (targetRef) => {
        popoverTargetRef.current = targetRef;
        setPopoverOpened(true);
    };
    return (
        <KonstaContainer titulo="Libro biblioteca">
            <Page>
                <br/>
                <br/>
                <br/>
                <Navbar
                    title="Badge"
                    right={
                        <Icon
                            badge="filtro"
                            badgeColors={{bg: 'bg-red-500'}}
                            onClick={() => setRightPanelOpened(true)}
                        ><img className={'icon-medium'} src="https://cdn-icons-png.flaticon.com/512/107/107799.png"
                              alt=""/></Icon>
                    }
                />

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
                        title="Right Panel"
                        right={
                            <div onClick={() => setRightPanelOpened(false)}>
                                Close
                            </div>
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
            {/*<Page>*/}
            {/*    <Navbar*/}
            {/*        title="Badge"*/}
            {/*        right={*/}
            {/*                <Icon*/}
            {/*                    badge="5"*/}
            {/*                    badgeColors={{ bg: 'bg-red-500' }}*/}
            {/*                />*/}
            {/*        }*/}
            {/*    />*/}

            {/*    <div>*/}
            {/*        <h1 className={'text-center'}>Libros</h1>*/}
            {/*        {error && (<><p>{error}</p></>)}*/}
            {/*    </div>*/}
            {/*</Page>*/}
        </KonstaContainer>
    )
}