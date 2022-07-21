import {Actions, ActionsButton, ActionsGroup, ActionsLabel, Button, ListItem} from "konsta/react";
import type {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useState} from "react";
import {
    LibroBibliotecaMostrarInterface
} from "~/components/libro-biblioteca/interfaces/libro-biblioteca-mostrar.interface";
import {LibroBibliotecaMostrarEnum} from "~/components/libro-biblioteca/enums/libro-biblioteca-mostrar.enum";
import MostrarSisImagen from "~/components/imagenes/MostrarSisImagen";

export function LibroBibliotecaMostrar(props: LibroBibliotecaMostrarInterface) {
    const {registro, dioClicBoton} = props;
    return (
        <>
            <ListItem
                className={'list-item-mlabs ' + (registro.sisHabilitado ? '' : 'deshabilitado')}
                media={<MenuBookIcon className={'text-yellow-500'}/>}
                title={(<>
                        <div className={'justify-items-stretch'}>
                            <div style={{float: 'left'}}>
                                {registro.id?.toString()} - {registro.nombre?.toString()}
                            </div>
                            <div className={'ml-2'} style={{float: 'right'}}>
                                {dioClicBoton &&
                                    <Button
                                        onClick={() => dioClicBoton && dioClicBoton(registro, LibroBibliotecaMostrarEnum.IconoOpciones)}><MoreVertIcon/></Button>}
                            </div>
                        </div>
                    </>
                ) as any}
                subtitle={registro.id?.toString()}
                after={(<NavigateNextIcon
                    className={'ml-4'}
                    onClick={() => dioClicBoton && dioClicBoton(registro, LibroBibliotecaMostrarEnum.IconoNavegar)}/>)}
                text={
                    <div className={'grid grid-cols-2 gap-4'}>
                        <div>
                            <MostrarSisImagen registro={registro} claseCss={''}/>
                        </div>
                        <div>
                            <p><strong>Fecha:</strong>{registro.sisCreado}</p>
                            <p><strong>Otro:</strong> Aqui mas info</p>
                        </div>
                        <div></div>
                    </div>
                }
            />
        </>
    )
}