import {json, LoaderFunction} from "@remix-run/node";
import {LibroBibliotecaFindDto} from "~/http/libro-biblioteca/dto/libro-biblioteca-find.dto";
import {LoaderSetQueryparams} from "~/functions/http/loader-set-queryparams";
import {LoaderSettearFindtoComun} from "~/functions/http/loader-settear-findto-comun";
import {SisHabilitadoEnum} from "~/enum/sis-habilitado.enum";
import {LibroBibliotecaInstanceHttp} from "~/http/libro-biblioteca/libro-biblioteca-instance.http";
import {eliminarUndNullVacio} from "~/functions/util/eliminar-und-null-vacio";
import {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";

export type LibroBibliotecaLoaderData = {
    registros?: [LibroBibliotecaInterface[], number],
    error?: string,
    mensaje?: string;
    findDto: LibroBibliotecaFindDto;
};

export const LibroBibliotecaLoader: LoaderFunction = async (
    {
        request,
        params, context
    }) => {
    const returnData: LibroBibliotecaLoaderData = {} as any;
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