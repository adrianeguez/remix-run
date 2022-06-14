import fetch from 'node-fetch';
import type {MetaFunction} from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import styles from '~/styles/global.css'
import tailwind from "./tailwind.css";

export const meta: () => { charset: string; viewport: string; title: string } = () => ({
    charset: "utf-8",
    title: "New Remix App",
    viewport: "width=device-width,initial-scale=1",
});

export function links() {
    return [
        // {rel: "stylesheet", href: core},
        // {rel: "stylesheet", href: normalize},
        // {rel: "stylesheet", href: structure},
        // {rel: "stylesheet", href: typography},
        // {rel: "stylesheet", href: padding},
        // {rel: "stylesheet", href: textAligment},
        // {rel: "stylesheet", href: float},
        // {rel: "stylesheet", href: textTransformation},
        // {rel: "stylesheet", href: flex},
        {rel: "stylesheet", href: tailwind},
        {rel: "stylesheet", href: styles},


    ];
}


export default function App() {
    return (
        <html lang="en">
        <head>
            <Meta/>
            <Links/>
        </head>
        <body>
            <Outlet/>

        <ScrollRestoration/>
        <Scripts/>
        <LiveReload/>
        </body>
        </html>
    );
}
