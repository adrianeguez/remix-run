import {App} from "konsta/react";
import LeftNavbarContainer from "~/components/LeftNavbarContainer";

const KonstaContainer = ({children, titulo}) => {
    if (!titulo) {
        titulo = 'El amor';
    }
    return (
        <>
            <App theme="ios">
                <LeftNavbarContainer titulo={titulo}>
                    {children}
                </LeftNavbarContainer>
            </App>
        </>
    )
}

export default KonstaContainer