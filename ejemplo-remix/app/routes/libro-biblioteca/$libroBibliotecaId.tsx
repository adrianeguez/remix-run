import KonstaContainer from "~/components/KonstaContainer";
import {Block, Navbar, Page, Popup} from "konsta/react";
import {useState} from "react";
import {useLoaderData, useNavigate} from "@remix-run/react";
import {motion} from "framer-motion";
import {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";
import {json, LoaderFunction} from "@remix-run/node";
import {LibroBibliotecaHttp} from "~/http/libro-biblioteca/libro-biblioteca.http";

type LoaderData = { librosBiblioteca?: [LibroBibliotecaInterface[], number], error?: string };
export const loader: LoaderFunction = async ({params}) => {
    const returnData: LoaderData = {
        librosBiblioteca: undefined,
        error: undefined
    };
    console.log('params', params);
    try {
        returnData.librosBiblioteca = await LibroBibliotecaHttp().find({id: params.libroBibliotecaId ? +params.libroBibliotecaId : 0})
    } catch (error: any) {
        returnData.error = error;
    }
    return json(returnData);
};

export default function LibroBibliotecaId() {
    const [popupOpened, setPopupOpened] = useState(true);
    const navigate = useNavigate();
    const salir = () => {
        navigate({pathname: "/libro-biblioteca"})
    }
    const animationConfiguration = {
        animate: {opacity: 1},
    };

    const data = useLoaderData<LoaderData>();
    console.log(data);

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
                            title={`Libro biblioteca ${data.librosBiblioteca && data.librosBiblioteca[0] && data.librosBiblioteca[0][0] && data.librosBiblioteca[0][0].id}`}
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