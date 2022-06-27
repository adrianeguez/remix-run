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
        returnData.error = error;
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

    // Funciones Util


    // Use Effects
    // Use Effect - Componente inicializado
    useEffect(
        () => {
            if (data.error) {
                toast.error('Error del servidor');
            }
            if (data.mensaje) {
                toast.success(data.mensaje);
            } else {
                toast.success('Cargo datos exitosamente');
            }
        }, []
    )

    // Funciones UI
    const navegarParametrosNuevo = (queryParams: string) => {
        navigate(`${path}/new?` + queryParams);
    };
    const navegarParametrosEditar = (queryParams: string, registro: LibroBibliotecaInterface) => {
        return `${path}/${registro.id}?` + queryParams;
    };
    const eventoSeleccionoSort = (sortField: SortFieldInterface, skipTake: { skip: number, take: number }) => {
        if (sortField && skipTake) {
            navigate(`${path}?${generarNavegarParametros(skipTake, sortField)}`)
        }
    }
    return (
        <KonstaContainer titulo="Libro biblioteca">
            {data.registros &&
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
                                                     mostrarItemEnLista={(registro, skipTake, indice) => (<>
                                                         <motion.div
                                                             initial={{opacity: 0, y: 10}}
                                                             animate={{opacity: 1, y: 0}}
                                                             exit={{opacity: 0, y: 0}}
                                                             transition={{delay: indice * 0.1}}
                                                             key={registro.id}>
                                                             <Link to={navegarParametrosEditar(skipTake, registro)}>
                                                                 <LibroBibliotecaMostrar
                                                                     registro={registro}></LibroBibliotecaMostrar>
                                                             </Link>

                                                         </motion.div>
                                                     </>)
                                                     }
                />}
        </KonstaContainer>
    )
}