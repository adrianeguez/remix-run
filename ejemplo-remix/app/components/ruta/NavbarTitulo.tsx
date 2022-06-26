export default function NavbarTitulo(props: { titulo: string; imagen?: string; color?: string; backgroundColor?: string; }) {
    const {titulo = 'Titulo',
        imagen = 'https://cdn-icons-png.flaticon.com/512/2232/2232688.png',
        color = '#616060'
    } = props;
    console.log('imagen', imagen);
    return (
        <>
            <div className={'navbar-ruta-titulo'} style={{
                color
            }}>{titulo}</div>
            <img className={'icon-medium navbar-ruta-imagen'}
                 src={imagen} alt=""/>
        </>
    )
}