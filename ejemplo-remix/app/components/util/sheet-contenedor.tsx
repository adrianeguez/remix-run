import {Block, Button, Sheet, Toolbar} from "konsta/react";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

export default function SheetContenedor({visualizacionAbierto, setVisualizacionAbierto, children}) {
    return (
        <>
            <Sheet
                className="pb-safe sheet-visualizar w-100"
                opened={visualizacionAbierto}
                onBackdropClick={() => setVisualizacionAbierto(false)}
            >
                <Toolbar top>
                    <div className="left"/>
                    <div className="right">
                        <div
                            onClick={() => setVisualizacionAbierto(false)}>
                            <CancelPresentationIcon/>
                        </div>
                    </div>
                </Toolbar>
                <Block>
                    {children}
                </Block>
            </Sheet>
        </>
    )
}