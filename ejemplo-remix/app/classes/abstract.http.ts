import {CONFIG} from "~/config";

export abstract class AbstractHttp<FindDTO = any, CreateDTO = any> {
    protected urlBackend = CONFIG.urlBackend;

    constructor(
        readonly protected url: string,
    ) {

    }

    async create(registroCreateDto: CreateDTO) {
        try {
            const respuesta = await fetch(`${this.urlBackend}${this.url}?`, {body: registroCreateDto, method: 'POST'});
            return respuesta.json();
        } catch (error) {
            console.error({error, mensaje: 'Error en find'});
            throw new Error(JSON.stringify(error));
        }
    }

    async find(registroFindDto?: FindDTO) {
        const queryParams = new URLSearchParams(registroFindDto as any);
        try {
            const respuesta = await fetch(`${this.urlBackend}${this.url}?` + queryParams)
            return respuesta.json();
        } catch (error) {
            console.error({error, mensaje: 'Error en find'});
            throw new Error(JSON.stringify(error));
        }
    }
}