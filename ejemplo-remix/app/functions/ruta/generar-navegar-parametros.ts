import {SkipTakeConstant} from "~/constantes/skip-take.constant";
import {convertirQueryParams} from "~/functions/http/convertir-query-params";
import {SortFieldInterface} from "~/interfaces/sort-field.interface";
import {SkipTakeInterface} from "~/interfaces/skip-take.interface";

export function generarNavegarParametros(skipTake: SkipTakeInterface, sortFieldSeleccionado: SortFieldInterface) {
    const skipTakeLocal = {
        skip: 0,
        take: 0,
    }
    if (skipTake.skip === 0 && skipTake.take === 0) {
        skipTakeLocal.take = SkipTakeConstant.take;
    } else {
        skipTakeLocal.skip = skipTake.skip;
        skipTakeLocal.take = skipTake.take;
    }
    const queryParams = convertirQueryParams({...sortFieldSeleccionado, ...skipTakeLocal});
    return `${queryParams}`;
}