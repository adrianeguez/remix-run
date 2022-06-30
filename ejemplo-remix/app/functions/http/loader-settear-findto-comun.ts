import {SortOrderEnum} from "~/enum/sort-order.enum";
import {SkipTakeConstant} from "~/constantes/skip-take.constant";

export function LoaderSettearFindtoComun(findDto: any) {

    if (!findDto.sortOrder && !findDto.sortField) {
        findDto.sortField = 'sisCreado';
        findDto.sortOrder = SortOrderEnum.Desc;
    }
    if (!findDto.skip) {
        findDto.skip = 0 + '';
    }
    if (!findDto.take) {
        findDto.take = SkipTakeConstant.take.toString();
    }
}