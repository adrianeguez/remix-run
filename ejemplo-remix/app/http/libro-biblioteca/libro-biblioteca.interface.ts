import {ComunHttpInterface} from "~/interfaces/comun-http.interface";

export interface LibroBibliotecaInterface extends ComunHttpInterface {
    nombre?: string;
    descripcion?: string;
    generoLibro?: string;
    isbn?: string;
}