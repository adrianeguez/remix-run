import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration, useLocation, useMatches,
} from "@remix-run/react";
import styles from "~/styles/global.css";
import tailwind from "./tailwind.css";
import React, {createContext, useEffect, useState} from 'react';
import {FuncionGenerarComponente, KonstaContainerInterface} from "~/components/KonstaContainer";
import {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";
import {useTheme} from "konsta/react";
import {useForm} from "react-hook-form";
import CamposFormularioActionAutocomplete from "~/components/form/lib/CamposFormularioActionAutocomplete";
import {Observable} from "rxjs";
import {ObservableWatchCampoInterface} from "~/components/form/lib/interfaces/observable-watch-campo.interface";
import {GenerarObservableWatchCampo} from "~/components/form/lib/funcion/generar-observable-watch-campo";

export const KonstaContainerContext = createContext({} as KonstaContainerInterface);

export const meta: () => {
    charset: string;
    viewport: string;
    title: string;
} = () => ({
    charset: "utf-8",
    title: "New Remix App",
    viewport: "width=device-width,initial-scale=1",
});

export function links() {
    return [
        {rel: "stylesheet", href: tailwind},
        {rel: "stylesheet", href: styles},
        {rel: "stylesheet", href: "https://fonts.googleapis.com/icon?family=Material+Icons"},

    ];
}

declare let window: any;
export default function App() {
    const location = useLocation();
    const matches = useMatches();

    let isMount = true;
    React.useEffect(() => {
        const mounted = isMount;
        isMount = false;
        if ("serviceWorker" in navigator) {
            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller?.postMessage({
                    type: "REMIX_NAVIGATION",
                    isMount: mounted,
                    location,
                    matches,
                    manifest: window.__remixManifest,
                });
            } else {
                const listener = async () => {
                    await navigator.serviceWorker.ready;
                    navigator.serviceWorker.controller?.postMessage({
                        type: "REMIX_NAVIGATION",
                        isMount: mounted,
                        location,
                        matches,
                        manifest: window.__remixManifest,
                    });
                };
                navigator.serviceWorker.addEventListener("controllerchange", listener);
                return () => {
                    navigator.serviceWorker.removeEventListener(
                        "controllerchange",
                        listener
                    );
                };
            }
        }
    }, [location]);

    const [loading, setLoading] = useState(false);
    const [campoFormularioAutocompleteGlobal, setCampoFormularioAutocompleteGlobal] = useState({} as CampoFormularioInterface);
    const useFormAutocomplete = useForm<any>({defaultValues: {busqueda: ''}});
    const [actionAutocompleteAbierto, setActionAutocompleteAbierto] = useState(false);
    const [seleccionoListaAutocomplete, setSeleccionoListaAutocomplete] = useState({} as { registro: any, campoFormulario: CampoFormularioInterface });
    const [listaAutocomplete, setListaAutocomplete] = useState([] as any[]);
    const [generarComponente, setGenerarComponente] = useState({} as FuncionGenerarComponente);
    const observableAutocomplete:Observable<ObservableWatchCampoInterface> = GenerarObservableWatchCampo(
        'busqueda',
        useFormAutocomplete
    );
    const [textoAutocompleteBusqueda, setTextoAutocompleteBusqueda] = useState('');

    useEffect(
        ()=>{
            escucharEventoAutocompleteBusqueda();
        },
        []
    )

    const escucharEventoAutocompleteBusqueda = () => {
        observableAutocomplete
            .subscribe(
                {
                    next: (data) => {
                        setTextoAutocompleteBusqueda(data.value);
                    }
                }
            );
    }
    return (
        <html lang="en">

        <head>

            <Meta/>
            <link rel="manifest" href="/resources/manifest.json"/>
            <Links/>
        </head>
        <body>
        <div>

            <KonstaContainerContext.Provider value={{
                loading,
                setLoading,
                useFormAutocomplete,
                generarComponente,
                setGenerarComponente,
                campoFormularioAutocompleteGlobal,
                setCampoFormularioAutocompleteGlobal,
                setListaAutocomplete,
                listaAutocomplete,
                setSeleccionoListaAutocomplete,
                seleccionoListaAutocomplete,
                setActionAutocompleteAbierto,
                actionAutocompleteAbierto,
                observableAutocomplete,
                textoAutocompleteBusqueda
            }}>
                <Outlet/> <ScrollRestoration/> <Scripts/> <LiveReload/>
            </KonstaContainerContext.Provider>

            {useFormAutocomplete &&

                <CamposFormularioActionAutocomplete
                    actionsOneOpened={actionAutocompleteAbierto}
                    useFormAutocomplete={useFormAutocomplete}
                    listaAutocomplete={listaAutocomplete}
                    setSeleccionoListaAutocomplete={setSeleccionoListaAutocomplete}
                    generarComponente={generarComponente}
                    campoFormulario={campoFormularioAutocompleteGlobal}
                    setListaAutocomplete={setListaAutocomplete}
                    setActionsOneOpened={setActionAutocompleteAbierto}
                    setEventoAutocomplete={setCampoFormularioAutocompleteGlobal}
                />}
        </div>
        </body>
        </html>
    );
}
