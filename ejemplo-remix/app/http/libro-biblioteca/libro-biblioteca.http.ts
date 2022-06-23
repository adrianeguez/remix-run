import {LibroBibliotecaFindDto} from "~/http/libro-biblioteca/dto/libro-biblioteca-find.dto";
import {CONFIG} from "~/config";
import {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";

export const LibroBibliotecaHttp = () => {
    const url = '/libro-biblioteca';
    return {
        find: async (libroBibliotecaFindDto?: LibroBibliotecaFindDto): Promise<[LibroBibliotecaInterface[], number]> => {
            const queryParams = new URLSearchParams(libroBibliotecaFindDto as any);
            try {
                const respuesta = await fetch(`${CONFIG.urlBackend}${url}?` + queryParams)
                return respuesta.json();
            } catch (error) {
                console.error({error, mensaje: 'Error consultando libros biblioteca'});
                throw new Error('Error');
            }
        }
    }
}