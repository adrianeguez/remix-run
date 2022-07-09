import {Toaster} from "react-hot-toast";
import {Backdrop, CircularProgress} from "@mui/material";
import {BackdropConstant} from "~/constantes/backdrop.constant";
import {useContext} from "react";
import {KonstaContainerContext} from "~/root";

export default function BackdropToaster() {
    const {loading} = useContext(KonstaContainerContext);
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Backdrop
                sx={
                    BackdropConstant
                }
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        </>
    )
}