import {SortOrderEnum} from "~/enum/sort-order.enum";

export interface FindDto {
    skip?: string;
    take?: string;
    sortField?: string;
    sortOrder?: SortOrderEnum;
}