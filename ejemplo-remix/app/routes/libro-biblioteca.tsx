import KonstaContainer from "~/components/KonstaContainer";
import type {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";
import type {LoaderFunction} from "@remix-run/node";
import {useLoaderData, useNavigate} from "@remix-run/react";
import {useContext, useEffect, useState} from "react";
import {LibroBibliotecaMostrar} from "~/components/libro-biblioteca/LibroBibliotecaMostrar";
import {LibroBibliotecaInstanceHttp} from "~/http/libro-biblioteca/libro-biblioteca-instance.http";
import toast from "react-hot-toast";
import {CommonSortFieldsConstant} from "~/constantes/common-sort-fields.constant";
import {SortFieldInterface} from "~/interfaces/sort-field.interface";
import {LibroBibliotecaFindDto} from "~/http/libro-biblioteca/dto/libro-biblioteca-find.dto";
import {NavigateFunction} from "react-router";
import RutaComun from "~/components/ruta/RutaComun";
import {NavbarSoloTituloInterface} from "~/components/ruta/interfaces/navbar-solo-titulo.interface";
import {motion} from "framer-motion";
import {SkipTakeInterface} from "~/interfaces/skip-take.interface";
import ComponenteError from "~/components/error/ComponenteError";
import {Actions, ActionsButton, ActionsGroup, ActionsLabel} from "konsta/react";
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
import {SisHabilitadoEnum} from "~/enum/sis-habilitado.enum";
import {LibroBibliotecaFiltroAccordionForm} from "~/http/libro-biblioteca/form/libro-biblioteca-filtro-accordion.form";
import {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";
import {KonstaContainerContext} from "~/root";
import {UtilNavegacion} from "~/functions/ruta/util-navegacion";
import {UtilAutocomplete} from "~/functions/ruta/util-autocomplete";
import {LibroBibliotecaLoader, LibroBibliotecaLoaderData} from "~/http/libro-biblioteca/libro-biblioteca.loader";

// Carga de datos en backend
export const loader: LoaderFunction = LibroBibliotecaLoader;

export default function LibroBiblioteca() {
    // Hooks Librearias y variables globales
    const loaderData = useLoaderData<LibroBibliotecaLoaderData>();
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
        setGenerarComponente,
        useFormReturnAutocompleteActual
    } = useContext(KonstaContainerContext);

    // Inicializar variables useState
    const [sortFields] = useState([...CommonSortFieldsConstant] as SortFieldInterface[]);
    const [abrioOpciones, setAbrioOpciones] = useState(false);
    const [registroSeleccionadoRuta, setRegistroSeleccionadoRuta] = useState({} as LibroBibliotecaInterface);
    const [visualizacionRegistroAbierto, setVisualizacionRegistroAbierto] = useState(false);
    const [camposFiltrosBusqueda, setCamposFiltrosBusqueda] = useState([...LibroBibliotecaFiltroForm()]);
    const [accordeonCamposFiltro] = useState(LibroBibliotecaFiltroAccordionForm());
    const tieneCampoFormulario = Object.keys(campoFormularioAutocompleteGlobal ? campoFormularioAutocompleteGlobal : {}).length > 0;
    const navegarUtil = UtilNavegacion(navigate, path);
    const autocompleteUtil = UtilAutocomplete(
        setActionAutocompleteAbierto,
        setCamposFiltrosBusqueda,
        camposFiltrosBusqueda,
        seleccionoListaAutocomplete,
        useFormReturnAutocompleteActual
    );
    // Funciones Util

    // Use Effects
    // Use Effect - Componente inicializado
    useEffect(
        () => {
            if (loaderData.error) {
                toast.error('Error del servidor');
            } else {
                if (loaderData.mensaje) {
                    toast.success(loaderData.mensaje);
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
                buscarAutocomplete();
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
        const registros = loaderData.registros;
        if (registros) {
            const campos = ['id', 'sisHabilitado', 'sisCreado', 'sisModificado'];
            ExportarDescargarCsvExport(campos, registros[0]);
        }
    };
    const descargarPDF = () => {
        const registros = loaderData.registros;
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
            recargarPaginaConNuevosQueryParams({
                findDto: {
                    ...obtenerQueryParams(),
                    ...loaderData.findDto,
                    ...findDto,
                }
            });
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
        console.log('data', data);
        console.log('findDto', {...data, ...loaderData.findDto});
        recargarPaginaConNuevosQueryParams({findDto: {...loaderData.findDto, ...data}});
    };
    // Funciones UI - Navegacion
    const navegarParametrosNuevo = navegarUtil.navegarParametrosNuevo;
    const navegarParametrosEditar = navegarUtil.navegarParametrosEditar;
    const obtenerQueryParams = () => navegarUtil.obtenerQueryParams;
    const recargarPaginaConNuevosQueryParams = navegarUtil.recargarPaginaConNuevosQueryParams;

    // Autocomplete
    const actualizarValorCampoAutocompleteGlobal = autocompleteUtil.actualizarValorCampoAutocompleteGlobal;
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
                buscarAutocompleteCampoAutocomplete();
                break;
            default:
                break;
        }
    };
    const buscarAutocompleteCampoAutocomplete = async () => {
        const respuesta = await buscarLibroBiblioteca(
            textoAutocompleteBusqueda
        );
        setListaAutocomplete(respuesta[0]);
    }

    // Metodos REST
    const buscarLibroBiblioteca = async (texto: string) => {
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
            setLoading(false);
            return librosBiblioteca;
        } catch (error) {
            console.error({
                error,
                mensaje: 'Error consultado autocomplete libro biblioteca'
            });
            toast.error('Error del servidor');
            setLoading(false);
        }
    }

    // Componente
    return (
        <KonstaContainer titulo="Libro biblioteca">
            {loaderData.registros &&
                <>
                    {/* Ruta */}
                    <RutaComun<LibroBibliotecaInterface, LibroBibliotecaFindDto> navigate={navigate}
                                                                                 findDto={loaderData.findDto}
                                                                                 path={path}
                                                                                 navbar={navbar}
                                                                                 navigateFabNewFunction={navegarParametrosNuevo}
                                                                                 registrosEncontrados={loaderData.registros}
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
            {loaderData.error && <ComponenteError linkTo={path}/>}
        </KonstaContainer>
    )
}