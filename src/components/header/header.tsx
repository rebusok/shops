import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import {createStyles, makeStyles, Toolbar} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Theme} from '@material-ui/core';
import {RoutingType} from "../../routes/routes";
import {NavLink} from 'react-router-dom';
import style from './Header.module.scss'
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);


const Header = () => {
    const classes = useStyles();
    const shopList = useSelector((state: AppRootStateType) => state.cart.carts)

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <NavLink className={style.headerLink} to={'/'}> <HomeIcon/></NavLink>

                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <NavLink to={RoutingType.auth} className={style.headerLink}>
                            Login
                        </NavLink>
                    </Typography>
                    <Button color="inherit"> <NavLink to={RoutingType.cart} className={style.headerLink}>
                        <ShoppingCartIcon/>
                        {shopList.length > 0 ? shopList.reduce((el, cur) => el + cur.count, 0) : null}
                    </NavLink></Button>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;