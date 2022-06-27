import {Icon, Navbar} from "konsta/react";
import {SortOrderEnum} from "~/enum/sort-order.enum";
import ArrowDownwardSharpIcon from "@mui/icons-material/ArrowDownwardSharp";
import ArrowUpwardSharpIcon from "@mui/icons-material/ArrowUpwardSharp";
import {NavbarTituloInterface} from "~/components/ruta/interfaces/navbar-titulo.interface";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export default function NavbarTitulo(props: NavbarTituloInterface) {
    const {
        titulo = 'Titulo',
        imagen = 'https://cdn-icons-png.flaticon.com/512/2232/2232688.png',
        colorClaseBanner = 'black',
        colorTituloClase = 'white',
        textoDescripcion = 'Ingrese la informacion necesaria',
        sortFieldSeleccionado,
        setActionSortFieldOpened,
        setRightPanelOpened
    } = props;
    return (
        <>
            <Navbar
                className={'navbar-ruta'}
                colors={{bgIos:colorClaseBanner, bgMaterial:colorClaseBanner}}
                title={
                    <>
                        <div className={'navbar-ruta-titulo ' +colorTituloClase}>{titulo}</div>
                        <img className={'icon-medium navbar-ruta-imagen'}
                             src={imagen} alt=""/>
                    </> as any
                }

                left={
                    <Icon
                        className={'badge-sort-order icon-medium'}
                        badge={'Orden'}
                        badgeColors={{bg: 'bg-red-500'}}
                        onClick={() => setActionSortFieldOpened(true)}
                    >
                        {sortFieldSeleccionado.sortOrder === SortOrderEnum.Desc ?
                            <ArrowDownwardSharpIcon className={'icon-medium'}/> :
                            <ArrowUpwardSharpIcon className={'icon-medium'}/>
                        }
                    </Icon>

                }
                right={
                    <Icon
                        className={'badge-sort-order-right icon-medium'}
                        badge="filtros"
                        badgeColors={{bg: 'bg-red-500'}}
                        onClick={() => setRightPanelOpened(true)}
                    ><FilterAltIcon/></Icon>
                }
            />
            <br/>
            <h2 className={'text-center'}>{textoDescripcion}</h2>
        </>
    )
}