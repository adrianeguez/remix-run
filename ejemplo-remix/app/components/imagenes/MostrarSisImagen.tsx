export interface MostrarSisImagenProps {
    registro: any;
    claseCss: string;
}

export default function MostrarSisImagen(props: MostrarSisImagenProps) {
    const {registro, claseCss} = props;
    return (
        <>
            {
                registro.sisImagen &&
                <img className={'sis-imagen ' + claseCss}
                     src={`data:${registro.sisImagen.mimetype};base64,` + registro.sisImagen.buffer}
                     alt="Red dot"/>
            }
        </>
    )
}