import React from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import Grid from "@material-ui/core/Grid";
import Item from "../item";
import {createStyles, makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            maxWidth: 300,
            padding: theme.spacing(2),
            marginRight: '2%'
        }
    }),
);
const ItemList = () => {
    const classes = useStyles();
    const shopList = useSelector((state: AppRootStateType) => state.shop)
    return (
        <div>
            <Grid container spacing={5}>
                {shopList.map((cart, inx) => {
                    return (
                        <Grid item sm className={classes.card} key={cart.id + inx}>
                            <Item cart={cart}/>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    );
};

export default ItemList;