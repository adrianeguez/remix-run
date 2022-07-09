import {App} from "konsta/react";
import LeftNavbarContainer from "~/components/LeftNavbarContainer";
import BackdropToaster from "~/components/util/BackdropToaster";
import {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";
import {Observable} from "rxjs";
import {ObservableWatchCampoInterface} from "~/components/form/lib/interfaces/observable-watch-campo.interface";
import {UseFormReturn} from "react-hook-form/dist/types";

export interface FuncionGenerarComponente {
    [key: string]: (registro: any, campoFormulario: CampoFormularioInterface) => JSX.Element;
}

export interface KonstaContainerInterface {
    loading: boolean,
    setLoading: (value: (((prevState: boolean) => boolean) | boolean)) => void;
    useFormAutocomplete: UseFormReturn;
    generarComponente: FuncionGenerarComponente;
    setGenerarComponente: (value: (
        (
            (prevState: FuncionGenerarComponente) => FuncionGenerarComponente)
        | FuncionGenerarComponente)
    ) => void;
    campoFormularioAutocompleteGlobal: CampoFormularioInterface;
    actionAutocompleteAbierto: boolean;
    setActionAutocompleteAbierto: any;
    seleccionoListaAutocomplete: { registro: any, campoFormulario: CampoFormularioInterface };
    setSeleccionoListaAutocomplete: any;
    listaAutocomplete: any[];
    setListaAutocomplete: any;
    observableAutocomplete: Observable<ObservableWatchCampoInterface>;
    textoAutocompleteBusqueda: string;
    setCampoFormularioAutocompleteGlobal: (value: (((prevState: CampoFormularioInterface) => CampoFormularioInterface) | CampoFormularioInterface)) => void;
}


const KonstaContainer = ({children, titulo}) => {
    if (!titulo) {
        titulo = 'El amor';
    }
    return (
        <>
            {/*<App theme={'ios'}>*/}
                <LeftNavbarContainer titulo={titulo}>
                    {children}
                </LeftNavbarContainer>
                <BackdropToaster/>
            {/*</App>*/}
        </>
    )
}

export default KonstaContainer