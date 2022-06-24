import KonstaContainer from "~/components/KonstaContainer";
import type {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";
import type { LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {LibroBibliotecaHttp} from "~/http/libro-biblioteca/libro-biblioteca.http";
import {Link, useLoaderData, useNavigate} from "@remix-run/react";
import {Badge, Block, Fab, List, ListItem, Navbar, Page, Popup} from "konsta/react";
import {useState} from "react";
import { Outlet } from "@remix-run/react";

type LoaderData = { librosBiblioteca?: [LibroBibliotecaInterface[], number], error?: string };
export const loader: LoaderFunction = async () => {
    const returnData: LoaderData = {
        librosBiblioteca: undefined,
        error: undefined
    };
    try {
        returnData.librosBiblioteca = await LibroBibliotecaHttp().find()
    } catch (error: any) {
        returnData.error = error;
    }
    return json(returnData);
};
export default function Index() {
    const data = useLoaderData<LoaderData>();
    let error = '';
    if (data.error) {
        error = 'Error obteniendo registros';
    }
    const navigate = useNavigate();
    return (
        <KonstaContainer titulo="Libro biblioteca">
            <div>
                    <h1 className={'text-center'}>Libros</h1>
                    {error && (<><p>{error}</p></>)}
                    <List>
                        {data.librosBiblioteca && data.librosBiblioteca[0].map(
                            (libro) => (
                                <Link key={libro.id} to={`/libro-biblioteca/${libro.id}`}>
                                    <ListItem title={libro.id ? libro.id.toString() : ''} after={<Badge title={'->'}>{'->'}</Badge>}></ListItem>
                                </Link>
                            )
                        )}
                    </List>

                    <Fab
                        className="fixed right-4-safe bottom-4-safe z-20"
                        onClick={() => {
                            navigate({pathname: "/libro-biblioteca/new"})
                        }}
                        text="+"/>

                    <Outlet />

            </div>
        </KonstaContainer>
    )
}