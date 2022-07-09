import {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";
import {SortFieldInterface} from "~/interfaces/sort-field.interface";
import {NavigateFunction} from "react-router";
import {NavbarSoloTituloInterface} from "~/components/ruta/interfaces/navbar-solo-titulo.interface";
import {SkipTakeInterface} from "~/interfaces/skip-take.interface";
import {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";
import {CampoFormularioAccordeonInterface} from "~/components/form/lib/interfaces/campo-formulario-accordeon.interface";

export interface RutaComunInterface<Registro = any, RegistroFindDto = any> {
    navigateFabNewFunction: () => void;
    registrosEncontrados: [Registro[], number];
    findDto: any;
    sortFieldsArray: SortFieldInterface[];
    mostrarItemEnLista: (registro: Registro, indice: number) => JSX.Element;
    navbar: NavbarSoloTituloInterface;
    navigate: NavigateFunction;
    path: string;
    eventoSeleccionoSort: (sortField: SortFieldInterface, skipTake?: SkipTakeInterface) => void;
    eventoBuscar: (data: RegistroFindDto) => void;
    mostrarFab: boolean;
    camposFiltro: CampoFormularioInterface[];
    accordeonCamposFiltro?: CampoFormularioAccordeonInterface[];
}