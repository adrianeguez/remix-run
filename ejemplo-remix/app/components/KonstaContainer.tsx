import {App} from "konsta/react";
const KonstaContainer = (props)=>{
    return (
        <>
            <App theme="ios">
                {props.children}
            </App>
        </>
    )
}

export default KonstaContainer