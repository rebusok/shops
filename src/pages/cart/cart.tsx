import React from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {Grid, makeStyles, Paper} from "@material-ui/core";
import { createStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import Item from "../../components/item";
import CartItem from './cartItem';




const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            marginTop: '2%'
        },
        paper: {
            padding: theme.spacing(2),

            color: theme.palette.text.secondary,
        },
    }),
);
const Cart = () => {
    const shopList2 = useSelector((state: AppRootStateType) => state.cart)

    const shopList = useSelector((state: AppRootStateType) => state.shop)
    const classes = useStyles();
    function FormRow() {
        return (
            <React.Fragment>
                <Grid item xs={8}>
                    {shopList2.map((cart, inx) => {
                        return (
                            <Grid item sm  key={cart.id + inx}>
                                    <CartItem cart={cart}/>
                            </Grid>
                        )
                    })}
                </Grid>
            </React.Fragment>
        );
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid container item xs={12} spacing={3}>
                    <FormRow />
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>item</Paper>
                    </Grid>
                </Grid>
                <div>Total price: {shopList2.length > 0 ? shopList2.reduce((el, cur) => el + cur.price, 0) : null} ₽</div>
            </Grid>
        </div>
    );
};

export default Cart;