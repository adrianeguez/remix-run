import KonstaContainer from "~/components/KonstaContainer";
import {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";
import {json, LoaderFunction} from "@remix-run/node";
import {LibroBibliotecaHttp} from "~/http/libro-biblioteca/libro-biblioteca.http";
import {useLoaderData, useNavigate} from "@remix-run/react";
import {Fab, Icon} from "konsta/react";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

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
            <h1>Libros</h1>
            {error && (<><p>{error}</p></>)}
            <ul>
                {data.librosBiblioteca && data.librosBiblioteca[0].map(
                    (libro) => (
                        <li key={libro.id}>{libro.id}</li>
                    )
                )}
            </ul>

            <Fab
                className="fixed right-4-safe bottom-4-safe z-20"
                onClick={() => {
                    navigate({pathname: "/libro-biblioteca/new"})
                }}
                text="+"/>
        </KonstaContainer>
    )
}