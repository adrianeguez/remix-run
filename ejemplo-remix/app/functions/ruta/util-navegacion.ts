import {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";
import {LoaderSetQueryparams} from "~/functions/http/loader-set-queryparams";
import {convertirQueryParams} from "~/functions/http/convertir-query-params";
import {LibroBibliotecaFindDto} from "~/http/libro-biblioteca/dto/libro-biblioteca-find.dto";

export const UtilNavegacion = (navigate, path:string)=>{
    return {
        navegarParametrosNuevo : () => {
            navigate(`${path}/nuevo?` + UtilNavegacion(navigate,path).obtenerQueryParamsYConvertir());
        },
        navegarParametrosEditar : (registro: LibroBibliotecaInterface) => {
            navigate(`${path}/${registro.id}?${UtilNavegacion(navigate,path).obtenerQueryParamsYConvertir()}`);
        },
        obtenerQueryParams : () => {
            return LoaderSetQueryparams(window.location.href);
        },
        obtenerQueryParamsYConvertir : () => {
            return convertirQueryParams(UtilNavegacion(navigate,path).obtenerQueryParams());
        },
        recargarPaginaConNuevosQueryParams : (parametros?: { queryParams?: string, findDto?: LibroBibliotecaFindDto }) => {
            if (parametros) {
                if (parametros.queryParams) {
                    navigate(`${path}?${parametros.queryParams}`);
                }
                if (parametros.findDto) {
                    navigate(`${path}?${convertirQueryParams(parametros.findDto)}`);
                }
            } else {
                navigate(`${path}?${UtilNavegacion(navigate,path).obtenerQueryParamsYConvertir()}`);
            }
        },
    };
}