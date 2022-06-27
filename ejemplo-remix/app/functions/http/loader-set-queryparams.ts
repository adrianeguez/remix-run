import {SortOrderEnum} from "~/enum/sort-order.enum";
import {SkipTakeConstant} from "~/constantes/skip-take.constant";

export function LoaderSetQueryparams(requestUrl: string) {
    const findDto: any = {};
    const url = new URL(requestUrl);
    findDto.sortField = url.searchParams.get("sortField") as string;
    findDto.sortOrder = url.searchParams.get("sortOrder") as SortOrderEnum;
    if (!findDto.sortOrder && !findDto.sortField) {
        findDto.sortField = 'sisCreado';
        findDto.sortOrder = SortOrderEnum.Desc;
    }

    findDto.skip = url.searchParams.get("skip") as string;
    if (!findDto.skip) {
        findDto.skip = 0 + '';
    }
    findDto.take = url.searchParams.get("take") as string;
    if (!findDto.take) {
        findDto.take = SkipTakeConstant.take.toString();
    }
    return findDto;
}