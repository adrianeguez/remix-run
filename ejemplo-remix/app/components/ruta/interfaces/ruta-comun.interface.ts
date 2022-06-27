import {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";
import {SortFieldInterface} from "~/interfaces/sort-field.interface";
import {NavigateFunction} from "react-router";
import {NavbarSoloTituloInterface} from "~/components/ruta/interfaces/navbar-solo-titulo.interface";
import {SkipTakeInterface} from "~/interfaces/skip-take.interface";

export interface RutaComunInterface<T = any> {
    loading: boolean;
    navigateFabNewFunction: (queryParams: string) => void;
    registrosEncontrados: [T[], number];
    findDto: any;
    sortFieldsArray: SortFieldInterface[];
    mostrarItemEnLista: (registro: T, queryParams: string, indice: number) => JSX.Element;
    navbar: NavbarSoloTituloInterface;
    navigate: NavigateFunction;
    path: string;
    eventoSeleccionoSort: (sortField: SortFieldInterface, skipTake?: SkipTakeInterface) => void;
    mostrarFab: boolean;
}