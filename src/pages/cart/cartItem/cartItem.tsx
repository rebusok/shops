import {makeStyles} from '@material-ui/core/styles';
import React, {FC} from 'react';
import {ButtonBase, createStyles, Grid, IconButton, Paper, Theme, Typography} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {CartItemType} from "../cartReducer";

interface cartItemTypeProps {
    cart:   CartItemType
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            marginTop: '1%'
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',

        },
        image: {
            width: 128,
            height: 128,
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
        btnIncDec: {
            display: 'flex',
            justifyContent:'center',
            alignItems: 'center',

        },
        counter: {
            padding: 10,
            fontSize:20
        },
        btn:{
            fontSize:40
        }
    }),
);




const CartItem:FC<cartItemTypeProps> = ({cart}) => {
    const {descrip, image, price, subTitle, title,count} = cart
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={image} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={10} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {title}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {descrip}
                                </Typography>

                            </Grid>

                        </Grid>
                        <Grid item xs={2} className={classes.btnIncDec}>
                            <IconButton>
                                <RemoveIcon/>
                            </IconButton>
                            <Typography variant="subtitle1" className={classes.counter}>{count}</Typography>
                            <IconButton>
                                <AddIcon/>

                            </IconButton>

                        </Grid>
                    </Grid>
                </Grid>
            </Paper>

        </div>
    );
};

export default CartItem;