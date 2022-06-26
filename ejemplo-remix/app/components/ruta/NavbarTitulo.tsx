import {Icon, Navbar} from "konsta/react";
import {SortOrderEnum} from "~/enum/sort-order.enum";
import ArrowDownwardSharpIcon from "@mui/icons-material/ArrowDownwardSharp";
import ArrowUpwardSharpIcon from "@mui/icons-material/ArrowUpwardSharp";
import {NavbarTituloInterface} from "~/components/ruta/interfaces/navbar-titulo.interface";

export default function NavbarTitulo(props: NavbarTituloInterface) {
    const {
        titulo = 'Titulo',
        imagen = 'https://cdn-icons-png.flaticon.com/512/2232/2232688.png',
        color = '#616060',
        textoDescripcion = 'Ingrese la informacion necesaria',
        sortFieldSeleccionado,
        setActionSortFieldOpened,
        setRightPanelOpened
    } = props;
    return (
        <>
            <Navbar
                className={'navbar-ruta'}
                style={{backgroundColor: '#7070a7'}}
                title={
                    <>
                        <div className={'navbar-ruta-titulo'} style={{
                            color
                        }}>{titulo}</div>
                        <img className={'icon-medium navbar-ruta-imagen'}
                             src={imagen} alt=""/>
                    </> as any
                }

                left={
                    <Icon
                        className={'badge-sort-order icon-medium'}
                        badge={sortFieldSeleccionado.sortFieldLabel}
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
                        badge="filtros"
                        badgeColors={{bg: 'bg-red-500'}}
                        onClick={() => setRightPanelOpened(true)}
                    ><img className={'icon-medium'} src="https://cdn-icons-png.flaticon.com/512/107/107799.png"
                          alt=""/></Icon>
                }
            />
            <h2 className={'text-center'}>{textoDescripcion}</h2>
        </>
    )
}