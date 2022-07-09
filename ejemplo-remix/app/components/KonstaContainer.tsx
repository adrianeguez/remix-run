import {App, useTheme} from "konsta/react";
import LeftNavbarContainer from "~/components/LeftNavbarContainer";
import {createContext, useContext, useEffect, useState} from "react";
import BackdropToaster from "~/components/util/BackdropToaster";
import {useForm} from "react-hook-form";
import {UseFormReturn} from "react-hook-form/dist/types";
import {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";
import CamposFormularioActionAutocomplete from "~/components/form/lib/CamposFormularioActionAutocomplete";
import {KonstaContainerContext} from "~/root";
import {Observable} from "rxjs";
import {ObservableWatchCampoInterface} from "~/components/form/lib/interfaces/observable-watch-campo.interface";

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
//     const [actionAutocompleteAbierto, setActionAutocompleteAbierto] = useState(false);
//     const [seleccionoListaAutocomplete, setSeleccionoListaAutocomplete] = useState({} as { registro: any, campoFormulario: CampoFormularioInterface });
// const [listaAutocomplete, setListaAutocomplete] = useState([] as any[]);
    setCampoFormularioAutocompleteGlobal: (value: (((prevState: CampoFormularioInterface) => CampoFormularioInterface) | CampoFormularioInterface)) => void;
}


const KonstaContainer = ({children, titulo}) => {
    if (!titulo) {
        titulo = 'El amor';
    }
    // const [loading, setLoading] = useState(false);
    // const [campoFormularioAutocompleteGlobal, setCampoFormularioAutocompleteGlobal] = useState({} as CampoFormularioInterface);
    // const theme = useTheme();
    // const useFormAutocomplete = useForm<any>({defaultValues: {busqueda: ''}});
    // const [actionAutocompleteAbierto, setActionAutocompleteAbierto] = useState(false);
    // const [seleccionoListaAutocomplete, setSeleccionoListaAutocomplete] = useState({} as { registro: any, campoFormulario: CampoFormularioInterface });
    // const [listaAutocomplete, setListaAutocomplete] = useState([] as any[]);
    // const [generarComponente, setGenerarComponente] = useState({} as FuncionGenerarComponente);

    const {
        campoFormularioAutocompleteGlobal,
        setCampoFormularioAutocompleteGlobal,
        setGenerarComponente,
        loading,
        setLoading,
        useFormAutocomplete,
        generarComponente,
        listaAutocomplete,
        setListaAutocomplete,
        seleccionoListaAutocomplete,
        setSeleccionoListaAutocomplete,
        setActionAutocompleteAbierto,
        actionAutocompleteAbierto,
    } = useContext(KonstaContainerContext);
    const contexto = useContext(KonstaContainerContext);
    return (
        <>
            {/*<App theme={'ios'}>*/}
            {/*<KonstaContainerContext.Provider value={{*/}
            {/*    loading,*/}
            {/*    setLoading,*/}
            {/*    useFormAutocomplete,*/}
            {/*    generarComponente,*/}
            {/*    setGenerarComponente,*/}
            {/*    campoFormularioAutocompleteGlobal,*/}
            {/*    setCampoFormularioAutocompleteGlobal*/}
            {/*}}>*/}
            <LeftNavbarContainer titulo={titulo}>
                {children}
            </LeftNavbarContainer>
            {'A DOLAR EL CULEO'}
            <BackdropToaster/>
            {/*</KonstaContainerContext.Provider>*/}
            {/*</App>*/}
        </>
    )
}

export default KonstaContainer