import {Toaster} from "react-hot-toast";
import {Backdrop, CircularProgress} from "@mui/material";
import {BackdropConstant} from "~/constantes/backdrop.constant";
import {useContext} from "react";
import {KonstaContainerContext} from "~/root";

export default function BackdropToaster() {
    const {loading} = useContext(KonstaContainerContext);
    const mostrarBackdrop = () => {
        if (loading === undefined) {
            return <div></div>
        } else {
            if (loading) {
                return <Backdrop
                    sx={
                        BackdropConstant
                    }
                    open={loading}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
            } else {
                return <div></div>
            }
        }
    }
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {mostrarBackdrop()}
            {/*{loading !== undefined ? <Backdrop*/}
            {/*    sx={*/}
            {/*        BackdropConstant*/}
            {/*    }*/}
            {/*    open={loading}*/}
            {/*>*/}
            {/*    <CircularProgress color="inherit"/>*/}
            {/*</Backdrop> : <></>}*/}
        </>
    )
}