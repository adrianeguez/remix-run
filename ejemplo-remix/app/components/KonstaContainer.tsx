import {App, useTheme} from "konsta/react";
import LeftNavbarContainer from "~/components/LeftNavbarContainer";
import {createContext, useState} from "react";
import BackdropToaster from "~/components/util/backdrop-toaster";

export interface KonstaContainerInterface {
    loading: boolean,
    setLoading: any
}

export const KonstaContainerContext = createContext({} as KonstaContainerInterface);

const KonstaContainer = ({children, titulo}) => {
    if (!titulo) {
        titulo = 'El amor';
    }
    const [loading, setLoading] = useState(false);
    const theme = useTheme();

    return (
        <>
            <App theme={'ios'}>
                <KonstaContainerContext.Provider value={{loading, setLoading}}>
                    <LeftNavbarContainer titulo={titulo}>
                        {children}
                    </LeftNavbarContainer>
                    <BackdropToaster></BackdropToaster>
                </KonstaContainerContext.Provider>
            </App>
        </>
    )
}

export default KonstaContainer