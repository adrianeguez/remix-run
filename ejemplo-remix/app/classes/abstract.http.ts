import {CONFIG} from "~/config";
import {GenerarFormData} from "~/functions/http/generar-form-data";
import {SisHabilitadoEnum} from "~/enum/sis-habilitado.enum";

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
}