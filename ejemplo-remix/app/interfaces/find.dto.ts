import {SortOrderEnum} from "~/enum/sort-order.enum";
import {SisHabilitadoEnum} from "~/enum/sis-habilitado.enum";

export interface FindDto {
    skip?: string;
    take?: string;
    sortField?: string;
    sortOrder?: SortOrderEnum;
    sisHabilitado?: SisHabilitadoEnum;
    sisCreado?: string;
    sisModificado?: string;
}