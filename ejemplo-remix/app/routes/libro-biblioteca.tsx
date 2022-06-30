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
import VisibilityIcon from '@mui/icons-material/Visibility';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import SheetContenedor from "~/components/util/SheetContenedor";
import {ExportarDescargarCsvExport} from "~/functions/export-data/exportar-descargar-csv.export";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from 'jspdf'
import autotable from 'jspdf-autotable'
import {LibroBibliotecaFiltroForm} from "~/http/libro-biblioteca/form/libro-biblioteca-filtro.form";
import {LibroBibliotecaMostrarCompleto} from "~/components/libro-biblioteca/LibroBibliotecaMostrarCompleto";
import {convertirQueryParams} from "~/functions/http/convertir-query-params";
import {SisHabilitadoEnum} from "~/enum/sis-habilitado.enum";
import {LibroBibliotecaFiltroAccordionForm} from "~/http/libro-biblioteca/form/libro-biblioteca-filtro-accordion.form";
import {SortOrderEnum} from "~/enum/sort-order.enum";
import {LoaderSettearFindtoComun} from "~/functions/http/loader-settear-findto-comun";

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
    const findDto: LibroBibliotecaFindDto = LoaderSetQueryparams(requestUrl) as LibroBibliotecaFindDto;
    LoaderSettearFindtoComun(findDto);
    const url = new URL(requestUrl);

    const id = url.searchParams.get('id');
    // Busqueda por ID
    if (!Number.isNaN(+id) && +id > 0) {
        findDto.id = +id;
    } else {
        // Busqueda por otros parametros
        const busqueda = url.searchParams.get('busqueda');
        if (busqueda) {
            // findDto.busqueda = busqueda;
        }
        findDto.sisHabilitado = url.searchParams.get("sisHabilitado") as SisHabilitadoEnum;
        findDto.sisCreado = url.searchParams.get("sisCreado") as string;
        findDto.sisModificado = url.searchParams.get("sisModificado") as string;
    }
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
        titulo: 'Libro biblioteca',
        imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Book.svg/1200px-Book.svg.png',
        textoDescripcion: 'Gestione sus libros',
        colorClaseBanner: 'libro-biblioteca-banner',
        colorTituloClase: 'texto-oscuro',
    };

    // Inicializar variables useState
    const [loading, setLoading] = useState(false);
    const [sortFields, setSortFields] = useState([...CommonSortFieldsConstant] as SortFieldInterface[]);
    const [abrioOpciones, setAbrioOpciones] = useState(false);
    const [registroSeleccionado, setRegistroSeleccionado] = useState({} as LibroBibliotecaInterface);
    const [visualizacionAbierto, setVisualizacionAbierto] = useState(false);
    const [camposFiltros, setCamposFiltros] = useState([...LibroBibliotecaFiltroForm()]);

    const [accordeonCamposFiltro, setAccordeonCamposFiltro] = useState(LibroBibliotecaFiltroAccordionForm());
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
    const deshabilitarRecurso = async () => {
        await DeshabilitarRegistroHttp(LibroBibliotecaInstanceHttp, registroSeleccionado);
        setAbrioOpciones(false);
        toast.success('Registro actualizado');
        recargarPaginaConNuevosQueryParams();
    };
    const visualizarRegistro = () => {
        setAbrioOpciones(false);
        setVisualizacionAbierto(true);
    };
    const descargarCSV = () => {
        const registros = data.registros;
        if (registros) {
            const campos = ['id', 'sisHabilitado', 'sisCreado', 'sisModificado'];
            ExportarDescargarCsvExport(campos, registros[0]);
        }
    };
    const descargarPDF = () => {
        const registros = data.registros;
        if (registros) {
            const cabeceras = [
                {header: 'ID', dataKey: 'id'},
                {header: 'Habilitado', dataKey: 'sisHabilitado'},
                {header: 'Creado', dataKey: 'sisCreado'},
                {header: 'Modificado', dataKey: 'sisModificado'},
            ];
            const doc = new jsPDF({
                orientation: "landscape"
            }) as any;
            autotable(doc, ({
                columnStyles: {europe: {halign: 'center'}}, // European countries centered
                body: registros[0],
                columns: cabeceras,
            } as any));
            doc.save('table.pdf');
        }

    };
    // Funciones UI - Eventos
    const eventoSeleccionoSort = (sortField: SortFieldInterface, skipTake: SkipTakeInterface) => {

        if (sortField && skipTake) {
            const findDto = obtenerQueryParams() as LibroBibliotecaFindDto;
            findDto.sortOrder = sortField.sortOrder;
            findDto.sortField = sortField.sortField;
            if (skipTake) {
                if (skipTake.skip || skipTake.skip === 0) {
                    findDto.skip = skipTake.skip as string;
                }
                if (skipTake.take) {
                    findDto.take = skipTake.take as string;
                }
            }
            recargarPaginaConNuevosQueryParams({findDto: {...obtenerQueryParams(), ...findDto}});
        }
    };
    const eventoClicBotonOpciones = (registro: LibroBibliotecaInterface, nombreEvento: LibroBibliotecaMostrarEnum, queryParams?: string) => {
        setRegistroSeleccionado(registro);
        switch (nombreEvento) {
            case LibroBibliotecaMostrarEnum.IconoNavegar:
                if (queryParams) {
                    navegarParametrosEditar(registro);
                }
                break;
            case LibroBibliotecaMostrarEnum.IconoOpciones:
                setAbrioOpciones(true);
                break;
            default:
                break;
        }
    };
    const eventoBuscar = (data: LibroBibliotecaFindDto) => {
        const findDto = obtenerQueryParams() as LibroBibliotecaFindDto;
        findDto.sisHabilitado = data.sisHabilitado;
        findDto.sisCreado = data.sisCreado;
        findDto.sisModificado = data.sisModificado;
        recargarPaginaConNuevosQueryParams({
            findDto
        });
    };
    // Funciones UI - Navegacion
    const navegarParametrosNuevo = () => {
        navigate(`${path}/nuevo?` + obtenerQueryParamsYConvertir());
    };
    const navegarParametrosEditar = (registro: LibroBibliotecaInterface) => {
        navigate(`${path}/${registro.id}?${obtenerQueryParamsYConvertir()}`);
    };
    const obtenerQueryParams = () => {
        return LoaderSetQueryparams(window.location.href);
    }
    const obtenerQueryParamsYConvertir = () => {
        return convertirQueryParams(obtenerQueryParams());
    }
    const recargarPaginaConNuevosQueryParams = (parametros?: { queryParams?: string, findDto?: LibroBibliotecaFindDto }) => {
        if (parametros) {
            if (parametros.queryParams) {
                navigate(`${path}?${parametros.queryParams}`);
            }
            if (parametros.findDto) {
                navigate(`${path}?${convertirQueryParams(parametros.findDto)}`);
            }
        } else {
            navigate(`${path}?${obtenerQueryParamsYConvertir()}`);
        }
    }

    return (
        <KonstaContainer titulo="Libro biblioteca">
            {data.registros &&
                <>
                    {/* Ruta */}
                    <RutaComun<LibroBibliotecaInterface, LibroBibliotecaFindDto> navigate={navigate}
                                                                                 loading={loading}
                                                                                 findDto={data.findDto}
                                                                                 path={path}
                                                                                 navbar={navbar}
                                                                                 navigateFabNewFunction={navegarParametrosNuevo}
                                                                                 registrosEncontrados={data.registros}
                                                                                 sortFieldsArray={sortFields}
                                                                                 eventoSeleccionoSort={eventoSeleccionoSort}
                                                                                 eventoBuscar={eventoBuscar}
                                                                                 mostrarFab={true}
                                                                                 camposFiltro={camposFiltros}
                                                                                 accordeonCamposFiltro={accordeonCamposFiltro}
                                                                                 mostrarItemEnLista={(registro, indice) => (<>
                                                                                     <motion.div
                                                                                         initial={{opacity: 0, y: 10}}
                                                                                         animate={{opacity: 1, y: 0}}
                                                                                         exit={{opacity: 0, y: 0}}
                                                                                         transition={{delay: indice * 0.001}}
                                                                                         key={registro.id}>
                                                                                         <LibroBibliotecaMostrar
                                                                                             registro={registro}
                                                                                             dioClicBoton={eventoClicBotonOpciones}/>
                                                                                     </motion.div>
                                                                                 </>)
                                                                                 }
                    />


                </>
            }
            {/* Opciones */}
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
                    <ActionsButton onClick={() => descargarCSV()} bold>
                        Descargar CSV <AssignmentReturnedIcon className={'ml-2'}/>
                    </ActionsButton>
                    <ActionsButton onClick={() => descargarPDF()} bold>
                        Descargar PDF <PictureAsPdfIcon className={'ml-2'}/>
                    </ActionsButton>
                    <ActionsButton
                        onClick={() => setAbrioOpciones(false)}
                        colors={{text: 'text-red-500'}}
                    >
                        Cancelar
                    </ActionsButton>
                </ActionsGroup>
            </Actions>
            {/* Visualizacion */}
            <SheetContenedor setVisualizacionAbierto={setVisualizacionAbierto}
                             visualizacionAbierto={visualizacionAbierto}>
                <LibroBibliotecaMostrarCompleto registro={registroSeleccionado}></LibroBibliotecaMostrarCompleto>
            </SheetContenedor>
            {/* Error */}
            {data.error && <ComponenteError linkTo={path}/>}
        </KonstaContainer>
    )
}