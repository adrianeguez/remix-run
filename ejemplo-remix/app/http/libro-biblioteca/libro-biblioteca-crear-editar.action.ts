import {ActionFunction, redirect} from "@remix-run/node";
import {LoaderSetQueryparams} from "~/functions/http/loader-set-queryparams";
import {LibroBibliotecaInstanceHttp} from "~/http/libro-biblioteca/libro-biblioteca-instance.http";
import {LibroBibliotecaCreateDto} from "~/http/libro-biblioteca/dto/libro-biblioteca-create.dto";
import {SisHabilitadoEnum} from "~/enum/sis-habilitado.enum";
import {convertirQueryParams} from "~/functions/http/convertir-query-params";
import {eliminarUndNullVacio} from "~/functions/util/eliminar-und-null-vacio";
import {LibroBibliotecaEnum} from "~/http/libro-biblioteca/form/libro-biblioteca.enum";
import {LibroBibliotecaUpdateDto} from "~/http/libro-biblioteca/dto/libro-biblioteca-update.dto";

export const LibroBibliotecaCrearEditarAction: ActionFunction = async (dataFunctionArgs) => {
    // Cargar Queryparams
    const requestUrl = dataFunctionArgs.request.url;
    const findDto = LoaderSetQueryparams(requestUrl);

    // Generar Body
    const body = await dataFunctionArgs.request.formData();
    try {
        let respuesta: any;
        const id = body.get('id');
        if (id) {
            const updateDto: LibroBibliotecaUpdateDto = {
                sisHabilitado: SisHabilitadoEnum.Activo,
                nombre: body.get(LibroBibliotecaEnum.Nombre),
            };
            respuesta = await LibroBibliotecaInstanceHttp.updateById(updateDto, +id);
        } else {
            const createDto: LibroBibliotecaCreateDto = {
                sisHabilitado: SisHabilitadoEnum.Activo,
                nombre: body.get(LibroBibliotecaEnum.Nombre),
            };
            respuesta = await LibroBibliotecaInstanceHttp.create(createDto);
        }
        if (respuesta.statusCode) {
            if (respuesta.statusCode === 400) {
                console.error({error: respuesta.message, mensaje: 'Error creando libro biblioteca'});
                return new Response(null as any, {status: 400}) as any;
            } else {
                console.error({mensaje: 'Error creando libro biblioteca'});
                return new Response(null as any, {status: 500}) as any;
            }
        }
        // fetch POST libro-biblioteca NESTJS
        return redirect(`/libro-biblioteca?${convertirQueryParams(eliminarUndNullVacio(findDto))}&mensaje=Registro libro biblioteca creado`) as any;
    } catch (error) {
        console.error({error, mensaje: 'Error creando libro biblioteca'});
        return new Response(null as any, {status: 500}) as any;
    }
};