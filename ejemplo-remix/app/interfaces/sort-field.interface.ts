import {SortOrderEnum} from "~/enum/sort-order.enum";

export interface SortFieldInterface {
    sortField?: string;
    sortOrder?: SortOrderEnum;
    sortFieldLabel?: string;
}