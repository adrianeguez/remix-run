import {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";
import {UseFormReturn} from "react-hook-form/dist/types";
import {FuncionGenerarComponente} from "~/components/KonstaContainer";

export interface CampoFormularioActionAutocompleteInterface {
    actionsOneOpened: boolean;
    useFormAutocomplete: UseFormReturn<any, any>;
    listaAutocomplete: any[];
    setSeleccionoListaAutocomplete: any;
    setListaAutocomplete: any;
    setEventoAutocomplete: any;
    setActionsOneOpened: any;
    generarComponente: FuncionGenerarComponente;
    campoFormulario: CampoFormularioInterface
}