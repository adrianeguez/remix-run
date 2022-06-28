import {BlockTitle, Button, List, Navbar, Popup} from "konsta/react";
import RestorePageIcon from "@mui/icons-material/RestorePage";
import EditIcon from "@mui/icons-material/Edit";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import {PropsWithChildren} from "react";
import {PopUpContenedorInterface} from "~/components/util/interfaces/pop-up-contenedor.interface";

export default function PopUpContenedor(props: PropsWithChildren<PopUpContenedorInterface>) {
    const {children, popupOpened, eventoSalir, estaEditando} = props
    return (
        <>
            <Popup className={"pop-up-konstaui p-4"} opened={popupOpened} onBackdropClick={() => eventoSalir()}>
                <>
                    <Navbar
                        title={
                            <div>
                                <span className={'mr-2'}>{estaEditando ? <RestorePageIcon/> :
                                    <EditIcon/>}</span> {`${estaEditando ? 'Editando ' + estaEditando.id : 'Creando'}`}
                            </div> as any
                        }
                        className={'navbar-titulo-popup'}
                        right={
                            <div className={'mr-3'} onClick={() => eventoSalir()}>
                                <CancelPresentationIcon/>

                            </div>
                        }
                    />
                    {children}
                </>
            </Popup>
        </>
    )
}