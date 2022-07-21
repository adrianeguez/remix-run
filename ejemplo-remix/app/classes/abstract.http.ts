import {CONFIG} from "~/config";
import {GenerarFormData} from "~/functions/http/generar-form-data";
import {SisHabilitadoEnum} from "~/enum/sis-habilitado.enum";
import {NuevoArchivoInterface} from "~/classes/interfaces/nuevo-archivo.interface";

export abstract class AbstractHttp<FindDTO = any, CreateDTO = any, Registro = any, UpdateDTO = any> {
    protected urlBackend = CONFIG.urlBackend;

    constructor(
        readonly protected url: string,
    ) {

    }

    async create(registroCreateDto: CreateDTO) {
        try {
            const respuesta = await fetch(`${this.urlBackend}${this.url}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registroCreateDto),
                method: 'POST'
            });
            return respuesta.json();
        } catch (error) {
            console.error({error, mensaje: 'Error en crear'});
            throw new Error(JSON.stringify(error));
        }
    }


    async updateById(registroUpdateDto: UpdateDTO, id: number | string) {
        try {
            const respuesta = await fetch(`${this.urlBackend}${this.url}/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registroUpdateDto),
                method: 'PUT'
            });
            return respuesta.json();
        } catch (error) {
            console.error({error, mensaje: 'Error en crear'});
            throw new Error(JSON.stringify(error));
        }
    }

    async find(registroFindDto?: FindDTO): Promise<[Registro[], number]> {
        const queryParams = new URLSearchParams(registroFindDto as any);
        try {
            const respuesta = await fetch(`${this.urlBackend}${this.url}?` + queryParams)
            return respuesta.json();
        } catch (error) {
            console.error({error, mensaje: 'Error en find'});
            throw new Error(JSON.stringify(error));
        }
    }

    async modificarHabilitado(registro: Registro) {
        try {
            const respuesta = await fetch(
                `${this.urlBackend}${this.url}/${registro.id}/modificar-habilitado`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: 'PUT',
                    body: JSON.stringify({sisHabilitado: registro.sisHabilitado ? SisHabilitadoEnum.Inactivo : SisHabilitadoEnum.Activo}),
                }
            );
            return respuesta.json();
        } catch (error) {
            console.error({error, mensaje: 'Error en modificar habilitado'});
            throw new Error(JSON.stringify(error));
        }
    }

    async subirArchivoPrincipal(nuevoArchivo: NuevoArchivoInterface) {
        const formData = new FormData();
        formData.append('id', nuevoArchivo.id.toString());
        formData.append('nombreIdentificador', nuevoArchivo.nombreIdentificador);
        formData.append('sisHabilitado', nuevoArchivo.sisHabilitado.toString());
        formData.append('tipo', nuevoArchivo.tipo);
        if (nuevoArchivo.nombre) {
            formData.append('nombre', nuevoArchivo.nombre);
        }
        if (nuevoArchivo.descripcion) {
            formData.append('descripcion', nuevoArchivo.descripcion);
        }
        formData.append('archivo', nuevoArchivo.file);
        try {
            const respuesta = await fetch(`${this.urlBackend}/archivo-secundario/subir-archivo-principal`, {
                body: formData,
                method: 'POST'
            });
            return respuesta.json();
        } catch (error) {
            console.error({error, mensaje: 'Error en subir archivo'});
            throw new Error(JSON.stringify(error));
        }
    }
}