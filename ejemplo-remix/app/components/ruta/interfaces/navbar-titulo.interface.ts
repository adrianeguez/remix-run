import {SortFieldInterface} from "~/interfaces/sort-field.interface";
import {NavbarSoloTituloInterface} from "~/components/ruta/interfaces/navbar-solo-titulo.interface";

export interface NavbarTituloInterface extends NavbarSoloTituloInterface {
    sortFieldSeleccionado: SortFieldInterface;
    setActionSortFieldOpened: (value: (((prevState: boolean) => boolean) | boolean)) => void;
    setRightPanelOpened: (value: (((prevState: boolean) => boolean) | boolean)) => void;
}