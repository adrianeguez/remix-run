import {debounceTime, Observable} from "rxjs";
import type {ObservableWatchCampoInterface} from "~/components/form/lib/interfaces/observable-watch-campo.interface";

export function GenerarObservableWatchCampo(nombreCampo: string, useForm: any, debounceTimeParameter = 1000): Observable<ObservableWatchCampoInterface> {
    return new Observable(
        (subscriber) => {
            useForm.watch((data, info: { type: string; name: string; }) => {
                if (info.name === nombreCampo) {
                    subscriber.next({data, info, value: data[nombreCampo]});
                }
            })
        }
    )
        .pipe(
            debounceTime(debounceTimeParameter),
        );
}