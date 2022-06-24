import {ListItem} from "konsta/react";
import type {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";
import type {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";

export function LibroBibliotecaMostrar(props:{registro: LibroBibliotecaInterface}){
    const {registro, campoFormulario} = props;
    return (
        <>
            <ListItem
                title={registro.id?.toString()}
                subtitle={registro.id?.toString()}
                after={(<img width={'15px'} height={'26px'} src={'https://www.freeiconspng.com/uploads/arrow-icon--icon-search-engine-2.png'}/>)}
                text={'Fecha: ' + registro.sisCreado}
            />
        </>
    )
}