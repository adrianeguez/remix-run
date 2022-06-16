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
import React from 'react';

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
        {rel: "stylesheet", href: "https://fonts.googleapis.com/icon?family=Material+Icons"},

    ];
}
declare let window:any;
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

    return (
        <html lang="en">

        <head>

            <Meta/>
          <link rel="manifest" href="/resources/manifest.json" />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
          <Links/>
        </head>
        <body>
        <Outlet/> <ScrollRestoration/> <Scripts/> <LiveReload/>
        </body>
        </html>
    );
}
