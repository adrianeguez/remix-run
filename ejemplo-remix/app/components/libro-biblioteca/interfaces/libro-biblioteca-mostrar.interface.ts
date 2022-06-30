import {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";
import {LibroBibliotecaMostrarEnum} from "~/components/libro-biblioteca/enums/libro-biblioteca-mostrar.enum";

export interface LibroBibliotecaMostrarInterface {
    registro: LibroBibliotecaInterface;
    dioClicBoton?: (registro: LibroBibliotecaInterface,
                    nombreEvento: LibroBibliotecaMostrarEnum,
                    queryParams?: string) => void;
}