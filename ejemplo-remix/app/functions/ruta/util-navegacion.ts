import {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";
import {LoaderSetQueryparams} from "~/functions/http/loader-set-queryparams";
import {convertirQueryParams} from "~/functions/http/convertir-query-params";
import {LibroBibliotecaFindDto} from "~/http/libro-biblioteca/dto/libro-biblioteca-find.dto";

export const UtilNavegacion = (navigate, path:string)=>{
    return {
        navegarParametrosNuevo : () => {
            navigate(`${path}/nuevo?` + this.obtenerQueryParamsYConvertir());
        },
        navegarParametrosEditar : (registro: LibroBibliotecaInterface) => {
            navigate(`${path}/${registro.id}?${this.obtenerQueryParamsYConvertir()}`);
        },
        obtenerQueryParams : () => {
            return LoaderSetQueryparams(window.location.href);
        },
        obtenerQueryParamsYConvertir : () => {
            return convertirQueryParams(this.obtenerQueryParams());
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
                navigate(`${path}?${this.obtenerQueryParamsYConvertir()}`);
            }
        },
    };
}