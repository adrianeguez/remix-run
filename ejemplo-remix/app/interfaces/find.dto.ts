import {SortOrderEnum} from "~/enum/sort-order.enum";

export interface FindDto {
    skip?: number;
    take?: number;
    sortField?: string;
    sortOrder?: SortOrderEnum;
}