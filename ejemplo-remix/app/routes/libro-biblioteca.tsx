import KonstaContainer from "~/components/KonstaContainer";
import type {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";
import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {Link, useLoaderData, useNavigate, useOutletContext} from "@remix-run/react";
import {useContext, useEffect, useState} from "react";
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
import {LoaderSettearFindtoComun} from "~/functions/http/loader-settear-findto-comun";
import {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";
import {useForm} from "react-hook-form";
import {KonstaContainerContext} from "~/root";
import {LibroBibliotecaEnum} from "~/http/libro-biblioteca/form/libro-biblioteca.enum";
import {UtilNavegacion} from "~/functions/ruta/util-navegacion";
// import {UtilNavegacion} from "~/functions/ruta/util-navegacion";

type LoaderData = {
    registros?: [LibroBibliotecaInterface[], number],
    error?: string,
    mensaje?: string;
    findDto: LibroBibliotecaFindDto;
};
// Carga de datos en backend
export const loader: LoaderFunction = async ({request, params, context}) => {
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
let eventoAutocompleteLocal: CampoFormularioInterface;
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
    const {
        campoFormularioAutocompleteGlobal,
        setActionAutocompleteAbierto,
        observableAutocomplete,
        seleccionoListaAutocomplete,
        textoAutocompleteBusqueda,
        setListaAutocomplete,
        setLoading,
        setGenerarComponente
    } = useContext(KonstaContainerContext);

    // Inicializar variables useState
    const [sortFields] = useState([...CommonSortFieldsConstant] as SortFieldInterface[]);
    const [abrioOpciones, setAbrioOpciones] = useState(false);
    const [registroSeleccionadoRuta, setRegistroSeleccionadoRuta] = useState({} as LibroBibliotecaInterface);
    const [visualizacionRegistroAbierto, setVisualizacionRegistroAbierto] = useState(false);
    const [camposFiltrosBusqueda, setCamposFiltrosBusqueda] = useState([...LibroBibliotecaFiltroForm()]);
    const [accordeonCamposFiltro] = useState(LibroBibliotecaFiltroAccordionForm());
    const tieneCampoFormulario = Object.keys(campoFormularioAutocompleteGlobal ? campoFormularioAutocompleteGlobal : {}).length > 0;
    const navegar = UtilNavegacion(navigate, path);
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
            actualizarVisualizarComponenteAutocomplete();
        }, []
    )

    useEffect(
        () => {
            buscarAutocomplete();
        },
        [textoAutocompleteBusqueda]
    )
    useEffect(
        () => {
            if (tieneCampoFormulario) {
                setActionAutocompleteAbierto(true);
            } else {
                setActionAutocompleteAbierto(false);
            }
        },
        [campoFormularioAutocompleteGlobal]
    )
    useEffect(
        () => {
            if (seleccionoListaAutocomplete.registro) {
                actualizarValorCampoAutocompleteGlobal();
            }
        },
        [seleccionoListaAutocomplete]
    )

    // Funciones UI
    // Funciones UI - Comunes tabla
    const deshabilitarRecurso = async () => {
        await DeshabilitarRegistroHttp(LibroBibliotecaInstanceHttp, registroSeleccionadoRuta);
        setAbrioOpciones(false);
        toast.success('Registro actualizado');
        recargarPaginaConNuevosQueryParams();
    };
    const visualizarRegistro = () => {
        setAbrioOpciones(false);
        setVisualizacionRegistroAbierto(true);
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
    const eventoClicBotonOpciones = (registro: LibroBibliotecaInterface, nombreEvento: LibroBibliotecaMostrarEnum) => {
        setRegistroSeleccionadoRuta(registro);
        switch (nombreEvento) {
            case LibroBibliotecaMostrarEnum.IconoNavegar:
                navegarParametrosEditar(registro);
                break;
            case LibroBibliotecaMostrarEnum.IconoOpciones:
                setAbrioOpciones(true);
                break;
            default:
                break;
        }
    };
    const eventoBuscar = (data: LibroBibliotecaFindDto) => {
        console.log('eventoBuscar', data);
    };
    // Funciones UI - Navegacion
    const navegarParametrosNuevo = navegar.navegarParametrosNuevo;
    const navegarParametrosEditar = navegar.navegarParametrosEditar;
    const obtenerQueryParams = () => navegar.obtenerQueryParams;
    const recargarPaginaConNuevosQueryParams = navegar.recargarPaginaConNuevosQueryParams;

    // const navegarParametrosNuevo = () => {
    //     navigate(`${path}/nuevo?` + obtenerQueryParamsYConvertir());
    // };
    // const navegarParametrosEditar = (registro: LibroBibliotecaInterface) => {
    //     navigate(`${path}/${registro.id}?${obtenerQueryParamsYConvertir()}`);
    // };
    // const obtenerQueryParams = () => {
    //     return LoaderSetQueryparams(window.location.href);
    // };
    // const obtenerQueryParamsYConvertir = () => {
    //     return convertirQueryParams(obtenerQueryParams());
    // };
    // const recargarPaginaConNuevosQueryParams = (parametros?: { queryParams?: string, findDto?: LibroBibliotecaFindDto }) => {
    //     if (parametros) {
    //         if (parametros.queryParams) {
    //             navigate(`${path}?${parametros.queryParams}`);
    //         }
    //         if (parametros.findDto) {
    //             navigate(`${path}?${convertirQueryParams(parametros.findDto)}`);
    //         }
    //     } else {
    //         navigate(`${path}?${obtenerQueryParamsYConvertir()}`);
    //     }
    // };
    // Autocomplete
    const actualizarValorCampoAutocompleteGlobal = () => {
        setActionAutocompleteAbierto(false);
        setCamposFiltrosBusqueda([
            ...camposFiltrosBusqueda.map(
                (f) => {
                    if (f.formControlName === LibroBibliotecaEnum.Autocomplete) {
                        f.initialValue = seleccionoListaAutocomplete.registro;
                        f.actualValue = seleccionoListaAutocomplete.registro;
                        if (f.autocomplete) {
                            f.autocomplete.valorActual = seleccionoListaAutocomplete.registro;
                        }
                    }
                    return f;
                }
            )
        ]);
    };
    const actualizarVisualizarComponenteAutocomplete = () => {
        setGenerarComponente({
            ...generarComponenteAutocompletePorFormControlName
        });
    };
    const generarComponenteAutocompletePorFormControlName = {
        autocomplete: (registro: LibroBibliotecaInterface, campoFormulario: CampoFormularioInterface) => {
            return (<><LibroBibliotecaMostrar registro={registro}/></>)
        },
    };
    const buscarAutocomplete = async () => {
        switch (campoFormularioAutocompleteGlobal.formControlName) {
            case 'autocomplete':
                await buscarLibroBiblioteca(textoAutocompleteBusqueda, campoFormularioAutocompleteGlobal);
                break;
            default:
                break;
        }
    };

    // Metodos REST
    const buscarLibroBiblioteca = async (texto: string, campo: CampoFormularioInterface) => {
        try {
            let librosBiblioteca: [LibroBibliotecaInterface[], number] = [[], 0];
            setLoading(true);
            if (Number.isNaN(Number(texto)) || texto === '') {
                librosBiblioteca = await LibroBibliotecaInstanceHttp.find({sisHabilitado: SisHabilitadoEnum.Activo});
            } else {
                librosBiblioteca = await LibroBibliotecaInstanceHttp.find({
                    id: +texto,
                    sisHabilitado: SisHabilitadoEnum.Activo
                });
            }
            toast(`${librosBiblioteca[0].length} registros consultados`, {
                icon: '📑'
            });
            setListaAutocomplete(librosBiblioteca[0]);
            setLoading(false);
        } catch (error) {
            console.error({
                error,
                mensaje: 'Error consultado autocomplete libro biblioteca'
            });
            toast.error('Error del servidor');
            setLoading(false);
        }
    }
    return (
        <KonstaContainer titulo="Libro biblioteca">
            {data.registros &&
                <>
                    {/* Ruta */}
                    <RutaComun<LibroBibliotecaInterface, LibroBibliotecaFindDto> navigate={navigate}
                                                                                 findDto={data.findDto}
                                                                                 path={path}
                                                                                 navbar={navbar}
                                                                                 navigateFabNewFunction={navegarParametrosNuevo}
                                                                                 registrosEncontrados={data.registros}
                                                                                 sortFieldsArray={sortFields}
                                                                                 eventoSeleccionoSort={eventoSeleccionoSort}
                                                                                 eventoBuscar={eventoBuscar}
                                                                                 mostrarFab={true}
                                                                                 camposFiltro={camposFiltrosBusqueda}
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
                            className={registroSeleccionadoRuta.sisHabilitado ? 'text-red-500' : ''}>
                            {registroSeleccionadoRuta.sisHabilitado ? 'Deshabiliar' : 'Habilitar'}{` ${registroSeleccionadoRuta.id}`}
                            <span className={'ml-2'}>
                                {registroSeleccionadoRuta.sisHabilitado ? <CancelIcon/> : <CheckCircleIcon/>}
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
            <SheetContenedor setVisualizacionAbierto={setVisualizacionRegistroAbierto}
                             visualizacionAbierto={visualizacionRegistroAbierto}>
                <LibroBibliotecaMostrarCompleto registro={registroSeleccionadoRuta}></LibroBibliotecaMostrarCompleto>
            </SheetContenedor>
            {/* Error */}
            {data.error && <ComponenteError linkTo={path}/>}
            {/*    Autocomplete*/}

            {/*<CamposFormularioActionAutocomplete actionsOneOpened={actionAutocompleteAbierto}*/}
            {/*                                    useFormAutocomplete={useFormAutocomplete}*/}
            {/*                                    listaAutocomplete={listaAutocomplete}*/}
            {/*                                    setSeleccionoListaAutocomplete={setSeleccionoListaAutocomplete}*/}
            {/*                                    generarComponente={generarComponenteAutocompletePorFormControlName}*/}
            {/*                                    campoFormulario={eventoAutocompleteLocal}*/}
            {/*                                    setListaAutocomplete={setListaAutocomplete}*/}
            {/*                                    setActionsOneOpened={setActionAutocompleteAbierto}*/}
            {/*                                    setEventoAutocomplete={setEventoAutocomplete}*/}
            {/*>*/}
            {/*</CamposFormularioActionAutocomplete>*/}
        </KonstaContainer>
    )
}