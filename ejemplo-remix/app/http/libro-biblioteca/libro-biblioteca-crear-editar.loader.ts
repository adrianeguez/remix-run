import {json, LoaderFunction} from "@remix-run/node";
import {LibroBibliotecaFindDto} from "~/http/libro-biblioteca/dto/libro-biblioteca-find.dto";
import {LoaderSetQueryparams} from "~/functions/http/loader-set-queryparams";
import {LibroBibliotecaInstanceHttp} from "~/http/libro-biblioteca/libro-biblioteca-instance.http";
import {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";

export type LibroBibliotecaCrearEditarLoaderData = {
    registro?: LibroBibliotecaInterface,
    findDto: LibroBibliotecaFindDto; // Guardamos para devolver a la ruta anterior los query params
};

export const LibroBibliotecaCrearEditarLoader: LoaderFunction = async (
    {
        request,
        params,
    }) => {
    const returnData: LibroBibliotecaCrearEditarLoaderData = {} as any;
    const {libroBibliotecaId} = params;
    const requestUrl = request.url;
    const findDto: LibroBibliotecaFindDto = LoaderSetQueryparams(requestUrl) as LibroBibliotecaFindDto;
    returnData.findDto = findDto
    if (!Number.isNaN(+libroBibliotecaId) && +libroBibliotecaId > 0) {
        const registro = await LibroBibliotecaInstanceHttp.find({id: +libroBibliotecaId});
        returnData.registro = registro[0][0];
        return json({findDto, registro});
    } else {
        return json({findDto});
    }

};