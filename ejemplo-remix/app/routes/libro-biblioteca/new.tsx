import KonstaContainer from "~/components/KonstaContainer";
import {motion} from "framer-motion"
import {Block, Navbar, Page, Popup} from "konsta/react";
import {useEffect, useState} from "react";
import {useNavigate} from "@remix-run/react";
import FormularioLibroBiblioteca from "~/components/form/libro-biblioteca/FormularioLibroBiblioteca";

export default function Index() {
    const [popupOpened, setPopupOpened] = useState(false);
    useEffect(
        () => {
            setTimeout(
                () => {
                    setPopupOpened(true);
                },
                1
            )
        },
        []
    )
    const navigate = useNavigate();
    const animationConfiguration = {
        animate: {opacity: 1},
    };
    const salir = () => {
        setPopupOpened(false);
        setTimeout(
            ()=>{
                navigate({pathname: "/libro-biblioteca"})
            },
            500
        );
    }
    return (
        <>
            <motion.div
                variants={animationConfiguration}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{duration: 1}}
            >
                <Popup className={"pop-up-konstaui"} opened={popupOpened} onBackdropClick={() => salir()}>
                    <Page>
                        <Navbar
                            title="Nuevo"
                            right={
                                <div onClick={() => salir()}>
                                    Close
                                </div>
                            }
                        />
                        <Block className="space-y-4">
                            <FormularioLibroBiblioteca></FormularioLibroBiblioteca>
                        </Block>
                    </Page>
                </Popup>
            </motion.div>
        </>
    )
}