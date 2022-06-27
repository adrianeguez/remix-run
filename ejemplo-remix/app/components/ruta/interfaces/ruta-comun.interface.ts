import {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";
import {SortFieldInterface} from "~/interfaces/sort-field.interface";
import {NavigateFunction} from "react-router";
import {NavbarSoloTituloInterface} from "~/components/ruta/interfaces/navbar-solo-titulo.interface";

export interface RutaComunInterface<T = any> {
    loading: boolean;
    navigateFabNewFunction: (queryParams: string) => void;
    registrosEncontrados: [T[], number];
    findDto: any;
    sortFieldsArray: SortFieldInterface[];
    mostrarItemEnLista: (registro:T, queryParams: string, indice:number) => JSX.Element;
    navbar: NavbarSoloTituloInterface;
    navigate: NavigateFunction;
    path: string;
    // titulo: string;
    // imagen?: string;
    // color?: string;
    // tituloColor?: string;
    // backgroundColor?: string;
    // textoDescripcion?: string;
    // sortFieldSeleccionado: SortFieldInterface;
    // setActionSortFieldOpened: (value: (((prevState: boolean) => boolean) | boolean)) => void;
    // setRightPanelOpened: (value: (((prevState: boolean) => boolean) | boolean)) => void;
}