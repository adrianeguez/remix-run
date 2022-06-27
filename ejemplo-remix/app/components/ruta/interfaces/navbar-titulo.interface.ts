import {SortFieldInterface} from "~/interfaces/sort-field.interface";

export interface NavbarTituloInterface {
    titulo: string;
    imagen?: string;
    color?: string;
    tituloColor?: string;
    backgroundColor?: string;
    textoDescripcion?: string;
    sortFieldSeleccionado: SortFieldInterface;
    setActionSortFieldOpened: (value: (((prevState: boolean) => boolean) | boolean)) => void;
    setRightPanelOpened: (value: (((prevState: boolean) => boolean) | boolean)) => void;

}