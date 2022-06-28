import KonstaContainer from "~/components/KonstaContainer";
import type {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";
import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {Link, useLoaderData, useNavigate} from "@remix-run/react";
import {useEffect, useState} from "react";
import {LibroBibliotecaMostrar} from "~/components/libro-biblioteca/LibroBibliotecaMostrar";
import {LibroBibliotecaInstanceHttp} from "~/http/libro-biblioteca/libro-biblioteca-instance.http";
import toast from "react-hot-toast";
import {CommonSortFieldsConstant} from "~/constantes/common-sort-fields.constant";
import {SortFieldInterface} from "~/interfaces/sort-field.interface";
import {LibroBibliotecaFindDto} from "~/http/libro-biblioteca/dto/libro-biblioteca-find.dto";
import {eliminarUndNullVacio} from "~/functions/util/eliminar-und-null-vacio";
import {LoaderSetQueryparams} from "~/functions/http/loader-set-queryparams";
import {NavigateFunction} from "react-router";
import RutaComun from "~/components/ruta/RutaComun";
import {NavbarSoloTituloInterface} from "~/components/ruta/interfaces/navbar-solo-titulo.interface";
import {motion} from "framer-motion";
import {generarNavegarParametros} from "~/functions/ruta/generar-navegar-parametros";
import {SkipTakeConstant} from "~/constantes/skip-take.constant";
import {SkipTakeInterface} from "~/interfaces/skip-take.interface";
import ComponenteError from "~/components/error/ComponenteError";
import {Actions, ActionsButton, ActionsGroup, ActionsLabel, Block, Button, Sheet, Toolbar} from "konsta/react";
import {LibroBibliotecaMostrarEnum} from "~/components/libro-biblioteca/enums/libro-biblioteca-mostrar.enum";
import {DeshabilitarRegistroHttp} from "~/functions/http/deshabilitar-registro.http";
import SheetContenedor from "~/components/util/sheet-contenedor";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
type LoaderData = {
    registros?: [LibroBibliotecaInterface[], number],
    error?: string,
    mensaje?: string;
    findDto: LibroBibliotecaFindDto;
};
// Carga de datos en backend
export const loader: LoaderFunction = async ({request}) => {
    const returnData: LoaderData = {} as any;
    const requestUrl = request.url;
    const findDto: LibroBibliotecaFindDto = LoaderSetQueryparams(requestUrl);
    const url = new URL(requestUrl);
    returnData.mensaje = url.searchParams.get("mensaje") as string;
    returnData.findDto = {...findDto};
    try {
        returnData.registros = await LibroBibliotecaInstanceHttp.find(eliminarUndNullVacio(findDto))
    } catch (error: any) {
        console.error({error, mensaje: 'Error consultando registros'});
        returnData.error = 'Error consultando registros';
    }
    return json(returnData);
};
// Ruta
export default function LibroBiblioteca() {
    // Hooks Librearias y variables globales
    const data = useLoaderData<LoaderData>();
    const navigate: NavigateFunction = useNavigate();
    const path = '/libro-biblioteca';
    const navbar: NavbarSoloTituloInterface = {
        titulo: 'El diablo es gay',
        imagen: 'https://www.adslzone.net/app/uploads-adslzone.net/2019/04/borrar-fondo-imagen.jpg',
        textoDescripcion: 'Me gusta el diablo',
        colorClaseBanner: 'libro-biblioteca-banner',
        colorTituloClase: 'texto-oscuro',
    };

    // Inicializar variables useState
    const [loading, setLoading] = useState(false);
    const [sortFields, setSortFields] = useState([...CommonSortFieldsConstant] as SortFieldInterface[]);
    const [abrioOpciones, setAbrioOpciones] = useState(false);
    const [registroSeleccionado, setRegistroSeleccionado] = useState({} as LibroBibliotecaInterface);
    const [visualizacionAbierto, setVisualizacionAbierto] = useState(false);
    // const [registros, setRegistros] = useState([...data.registros] as [LibroBibliotecaInterface[], number]);

    // Funciones Util


    // Use Effects
    // Use Effect - Componente inicializado
    useEffect(
        () => {
            if (data.error) {
                toast.error('Error del servidor');
            } else {
                if (data.mensaje) {
                    toast.success(data.mensaje);
                } else {
                    toast.success('Cargo datos exitosamente');
                }
            }
        }, []
    )

    // Funciones UI
    const navegarParametrosNuevo = (queryParams: string) => {
        navigate(`${path}/nuevo?` + queryParams);
    };
    const navegarParametrosEditar = (queryParams: string, registro: LibroBibliotecaInterface) => {
        return `${path}/${registro.id}?` + queryParams;
    };
    const eventoSeleccionoSort = (sortField: SortFieldInterface, skipTake: SkipTakeInterface) => {
        if (sortField && skipTake) {
            navigate(`${path}?${generarNavegarParametros(skipTake, sortField)}`)
        }
    };
    const dioClicBoton = (registro: LibroBibliotecaInterface, nombreEvento: LibroBibliotecaMostrarEnum, queryParams?: string) => {
        setRegistroSeleccionado(registro);
        switch (nombreEvento) {
            case LibroBibliotecaMostrarEnum.IconoNavegar:
                if (queryParams) {
                    navigate(navegarParametrosEditar(queryParams, registro));
                }
                break;
            case LibroBibliotecaMostrarEnum.IconoOpciones:
                setAbrioOpciones(true);
                break;
            default:
                break;
        }
    };
    const deshabilitarRecurso = async () => {
        await DeshabilitarRegistroHttp(LibroBibliotecaInstanceHttp, registroSeleccionado);
        setAbrioOpciones(false);
        navigate(`${path}?${LoaderSetQueryparams(window.location.href)}`);
    };
    const visualizarRegistro = () => {
        setAbrioOpciones(false);
        setVisualizacionAbierto(true);
    };
    return (
        <KonstaContainer titulo="Libro biblioteca">
            {data.registros &&
                <>
                    <RutaComun<LibroBibliotecaInterface> navigate={navigate}
                                                         loading={loading}
                                                         findDto={data.findDto}
                                                         path={path}
                                                         navbar={navbar}
                                                         navigateFabNewFunction={navegarParametrosNuevo}
                                                         registrosEncontrados={data.registros}
                                                         sortFieldsArray={sortFields}
                                                         eventoSeleccionoSort={eventoSeleccionoSort}
                                                         mostrarFab={true}
                                                         mostrarItemEnLista={(registro, queryParams, indice) => (<>
                                                             <motion.div
                                                                 initial={{opacity: 0, y: 10}}
                                                                 animate={{opacity: 1, y: 0}}
                                                                 exit={{opacity: 0, y: 0}}
                                                                 transition={{delay: indice * 0.1}}
                                                                 key={registro.id}>
                                                                 <LibroBibliotecaMostrar queryParams={queryParams}
                                                                                         registro={registro}
                                                                                         dioClicBoton={dioClicBoton}/>
                                                             </motion.div>
                                                         </>)
                                                         }
                    />


                </>
            }
            <Actions
                opened={abrioOpciones}
                onBackdropClick={() => setAbrioOpciones(false)}
            >
                <ActionsGroup>
                    <ActionsLabel>Seleccione una accion</ActionsLabel>
                    <ActionsButton onClick={() => visualizarRegistro()} bold>
                        Visualizar <VisibilityIcon className={'ml-2'}/>
                    </ActionsButton>
                    <ActionsButton onClick={() => deshabilitarRecurso()} bold>
                        <div
                            className={registroSeleccionado.sisHabilitado ? 'text-red-500' : ''}>
                            {registroSeleccionado.sisHabilitado ? 'Deshabiliar' : 'Habilitar'}{` ${registroSeleccionado.id}`}
                            <span className={'ml-2'}>
                                {registroSeleccionado.sisHabilitado ? <CancelIcon/> : <CheckCircleIcon/>}
                            </span>
                        </div>
                    </ActionsButton>
                    <ActionsButton
                        onClick={() => setAbrioOpciones(false)}
                        colors={{text: 'text-red-500'}}
                    >
                        Cancelar
                    </ActionsButton>
                </ActionsGroup>
            </Actions>
            <SheetContenedor setVisualizacionAbierto={setVisualizacionAbierto}
                             visualizacionAbierto={visualizacionAbierto}>
                <p>
                    Lorem ipsum
                </p>
            </SheetContenedor>
            {data.error && <ComponenteError linkTo={path}/>}
        </KonstaContainer>
    )
}