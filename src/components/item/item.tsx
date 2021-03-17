import React, {FC} from 'react';
import {
    Button,
    CardHeader,
    createMuiTheme, createStyles,
    IconButton,
    makeStyles,
    Theme,
    ThemeProvider,
    Typography
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import {green} from "@material-ui/core/colors";
import {ShopItemType} from "../../pages/main/shopReducer";
import { addCartItem } from '../../pages/cart/cartReducer';
import {AppRootStateType, useAppDispatch} from "../../store/store";
import {useSelector} from "react-redux";


interface cartTypeProps {
    cart:   ShopItemType
}
const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            minWidth: 300,
            minHeight: 520,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
            width: '100%',
            backgroundSize: 'auto 100%'
        },
        cardAction: {
            display: 'flex',
            justifyContent: 'space-between',
            backgroundSize: 'contain'
        }
    }),
);
const Item:FC<cartTypeProps> = ({cart}) => {
    const classes = useStyles();
    const {descrip, image, price, subTitle, title} = cart
    const dispatch = useAppDispatch();

    const onClickHandler = () => {
        dispatch(addCartItem({cart}))
        console.log('clock')
    }
    return (
        <>
            <Card className={classes.card}>
                <CardHeader
                    action={
                        <IconButton aria-label="settings" onClick={onClickHandler}>
                            <AddShoppingCartIcon/>
                        </IconButton>
                    }
                    title={title}
                    subheader={subTitle}
                />
                <CardMedia
                    className={classes.media}
                    image={image}
                    title={subTitle}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="h4">
                        {descrip}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing className={classes.cardAction}>
                    <Typography variant="h5" component="p">
                        Price: {price}₽
                    </Typography>
                    <ThemeProvider theme={theme}>
                        <Button size="small" color="primary" variant="contained" onClick={onClickHandler}>
                            Add to cart
                        </Button>
                    </ThemeProvider>
                </CardActions>
            </Card>
        </>
    );
};

export default Item;