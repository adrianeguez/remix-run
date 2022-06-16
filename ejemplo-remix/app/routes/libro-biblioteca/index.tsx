import KonstaContainer from "~/components/KonstaContainer";
import {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";
import {json, LoaderFunction} from "@remix-run/node";
import {LibroBibliotecaHttp} from "~/http/libro-biblioteca/libro-biblioteca.http";
import {useLoaderData, useNavigate} from "@remix-run/react";
import {Fab, Icon} from "konsta/react";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

type LoaderData = { librosBiblioteca: [LibroBibliotecaInterface[], number] };
export const loader: LoaderFunction = async () => {
    const data = await LibroBibliotecaHttp().find({})
    return json({librosBiblioteca: data});
};
export default function Index() {
    const data = useLoaderData<LoaderData>();
    const navigate = useNavigate();
    return (
        <KonstaContainer titulo="Libro biblioteca">
            <h1>Libros</h1>
            <Fab
                className="fixed right-4-safe bottom-4-safe z-20"
                onClick={()=>{navigate({pathname:"/libro-biblioteca/new"})}}
                text="+"/>
            <ul>
                {data.librosBiblioteca[0].map(
                    (libro) => (
                        <li key={libro.id}>{libro.id}</li>
                    )
                )}
            </ul>
        </KonstaContainer>
    )
}