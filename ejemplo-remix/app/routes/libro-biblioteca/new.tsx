import KonstaContainer from "~/components/KonstaContainer";
import {motion} from "framer-motion"
import {Block, Navbar, Page, Popup} from "konsta/react";
import {useEffect, useState} from "react";
import {useNavigate} from "@remix-run/react";

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
                            <p>
                                Here comes popup. You can put here anything, even independent view
                                with its own navigation. Also not, that by default popup looks a
                                bit different on iPhone/iPod and iPad, on iPhone it is fullscreen.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Suspendisse faucibus mauris leo, eu bibendum neque congue non. Ut
                                leo mauris, eleifend eu commodo a, egestas ac urna. Maecenas in
                                lacus faucibus, viverra ipsum pulvinar, molestie arcu. Etiam
                                lacinia venenatis dignissim. Suspendisse non nisl semper tellus
                                malesuada suscipit eu et eros. Nulla eu enim quis quam elementum
                                vulputate. Mauris ornare consequat nunc viverra pellentesque.
                                Aenean semper eu massa sit amet aliquam. Integer et neque sed
                                libero mollis elementum at vitae ligula. Vestibulum pharetra sed
                                libero sed porttitor. Suspendisse a faucibus lectus.
                            </p>
                            <p>
                                Duis ut mauris sollicitudin, venenatis nisi sed, luctus ligula.
                                Phasellus blandit nisl ut lorem semper pharetra. Nullam tortor
                                nibh, suscipit in consequat vel, feugiat sed quam. Nam risus
                                libero, auctor vel tristique ac, malesuada ut ante. Sed molestie,
                                est in eleifend sagittis, leo tortor ullamcorper erat, at
                                vulputate eros sapien nec libero. Mauris dapibus laoreet nibh quis
                                bibendum. Fusce dolor sem, suscipit in iaculis id, pharetra at
                                urna. Pellentesque tempor congue massa quis faucibus. Vestibulum
                                nunc eros, convallis blandit dui sit amet, gravida adipiscing
                                libero.
                            </p>
                        </Block>
                    </Page>
                </Popup>
            </motion.div>
        </>
    )
}