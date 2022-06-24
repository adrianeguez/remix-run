import {ListItem} from "konsta/react";
import type {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";
import type {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";

export function LibroBibliotecaMostrar(props:{registro: LibroBibliotecaInterface, campoFormulario: CampoFormularioInterface}){
    const {registro, campoFormulario} = props;
    return (
        <>
            <ListItem
                link
                title={registro.id?.toString()}
                subtitle={campoFormulario.formControlName}
                after={registro.sisCreado}
                text="Lleno"
            />
        </>
    )
}