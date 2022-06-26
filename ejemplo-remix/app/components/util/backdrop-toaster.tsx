import {Toaster} from "react-hot-toast";
import {Backdrop, CircularProgress} from "@mui/material";
import {BackdropConstant} from "~/constantes/backdrop.constant";

export default function BackdropToaster(props: { loading }) {
    const {loading} = props;
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