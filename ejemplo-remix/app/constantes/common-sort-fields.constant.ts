import {SortFieldInterface} from "~/interfaces/sort-field.interface";
import {SortOrderEnum} from "~/enum/sort-order.enum";

export const CommonSortFieldsConstant: SortFieldInterface[] = [
    {
        sortOrder: SortOrderEnum.Asc,
        sortField: 'id',
        sortFieldLabel: 'Identificador'
    },
    {
        sortOrder: SortOrderEnum.Asc,
        sortField: 'sisCreado',
        sortFieldLabel: 'Fecha Creacion'
    },
    {
        sortOrder: SortOrderEnum.Asc,
        sortField: 'sisModificado',
        sortFieldLabel: 'Fecha Modificacion'
    },
    {
        sortOrder: SortOrderEnum.Asc,
        sortField: 'sisHabilitado',
        sortFieldLabel: 'Habilitado'
    }
];
