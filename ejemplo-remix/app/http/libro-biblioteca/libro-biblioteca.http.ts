import type {LibroBibliotecaFindDto} from "~/http/libro-biblioteca/dto/libro-biblioteca-find.dto";
import {CONFIG} from "~/config";
import {AbstractHttp} from "~/classes/abstract.http";
import {LibroBibliotecaCreateDto} from "~/http/libro-biblioteca/dto/libro-biblioteca-create.dto";

export class LibroBibliotecaHttp extends AbstractHttp<LibroBibliotecaFindDto, LibroBibliotecaCreateDto>{
    constructor(url:string) {
        super(
            url
        );
    }
}
// = () => {
//     const url = '/libro-biblioteca';
//     return {
//         find: async (libroBibliotecaFindDto?: LibroBibliotecaFindDto): Promise<[LibroBibliotecaInterface[], number]> => {
//             const queryParams = new URLSearchParams(libroBibliotecaFindDto as any);
//             try {
//                 const respuesta = await fetch(`${CONFIG.urlBackend}${url}?` + queryParams)
//                 return respuesta.json();
//             } catch (error) {
//                 console.error({error, mensaje: 'Error consultando libros biblioteca'});
//                 throw new Error('Error');
//             }
//         }
//     }
// }