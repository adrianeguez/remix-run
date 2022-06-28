import {Button} from "konsta/react";
import {Link} from "@remix-run/react";

export default function ComponenteError(props: { linkTo: string }) {
    const {linkTo} = props;
    return (
        <>
            <div className={'text-center text-red-500'}>Error al cargar esta ruta.</div>
            <div className={'grid grid-cols-3 gap-4 m-3'}>
                <div></div>
                <div>
                    <Link to={linkTo}>
                        <Button>Recargar</Button>
                    </Link>
                </div>
                <div></div>
            </div>
        </>
    )
}