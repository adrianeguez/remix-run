import {CONFIG} from "~/config";

export abstract class AbstractHttp<FindDTO=any> {
    protected urlBackend = CONFIG.urlBackend;
    constructor(
        readonly protected url: string,
    ) {

    }

    async find(libroBibliotecaFindDto?: FindDTO) {
        const queryParams = new URLSearchParams(libroBibliotecaFindDto as any);
        try {
            const respuesta = await fetch(`${this.urlBackend}${this.url}?` + queryParams)
            return respuesta.json();
        } catch (error) {
            console.error({error, mensaje: 'Error en find'});
            throw new Error(JSON.stringify(error));
        }
    }
}