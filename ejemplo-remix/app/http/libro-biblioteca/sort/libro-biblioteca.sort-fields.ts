import {SortFieldInterface} from "~/interfaces/sort-field.interface";
import {SortOrderEnum} from "~/enum/sort-order.enum";
import {LibroBibliotecaEnum} from "~/http/libro-biblioteca/form/libro-biblioteca.enum";

export const LibroBibliotecaSortFields: SortFieldInterface[] = [
    {
        sortOrder: SortOrderEnum.Asc,
        sortField: LibroBibliotecaEnum.Nombre,
        sortFieldLabel: 'Nombre'
    }
];
