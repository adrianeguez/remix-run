import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import type {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {Link} from "@remix-run/react";

const drawerWidth = 240;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
    open?: boolean;
}>(({theme, open}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

// @ts-ignore
export default function LeftNavbarContainer({children, titulo}) {
    if (!titulo) {
        titulo = 'El amor';
    }
    const theme = useTheme();
    const menu = [
        {
            nombre: 'Libro biblioteca',
            icono: ()=> (<>
                    <InboxIcon></InboxIcon>
            </>
            ),
            link: '/libro-biblioteca',
        },
        {
            nombre: 'Inicio',
            icono: ()=> (<>
                    <InboxIcon></InboxIcon>
                </>
            ),
            link: '/',
        },
        {
            nombre: 'Login',
            icono: ()=> (<>
                    <InboxIcon></InboxIcon>
                </>
            ),
            link: '/login',
        }
    ]
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{mr: 2, ...(open && {display: 'none'})}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {titulo}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <p style={{flex: 'auto'}}> Bienvenido</p>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    {menu.map((itemMenu, index) => (
                        <ListItem key={itemMenu.nombre} disablePadding>
                            <Link to={itemMenu.link} style={{width:'100%'}}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {itemMenu.icono()}
                                    </ListItemIcon>
                                    <ListItemText primary={itemMenu.nombre}/>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {menu.map((itemMenu, index) => (
                        <ListItem key={itemMenu.nombre} disablePadding >
                            <Link to={itemMenu.link} style={{width:'100%'}}>
                                <ListItemButton >
                                    <ListItemIcon>
                                        {itemMenu.icono()}
                                    </ListItemIcon>
                                    <ListItemText primary={itemMenu.nombre} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={open}>
                <div style={{paddingTop: '50px'}}>
                    {children}
                </div>
            </Main>
        </Box>
    );
}
