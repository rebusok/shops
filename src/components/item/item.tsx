import React, {FC} from 'react';
import {
    Button,
    CardHeader,
    createMuiTheme,
    createStyles,
    makeStyles,
    ThemeProvider,
    Typography
} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import {green} from "@material-ui/core/colors";
import {ShopItemType} from "../../pages/main/shopReducer";
import {addCartItem} from '../../pages/cart/cartReducer';
import {useAppDispatch} from "../../store/store";


interface cartTypeProps {
    cart:   ShopItemType
}
const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});
const useStyles = makeStyles(() =>
    createStyles({
        card: {
            minWidth: 320,
            minHeight: 720,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        },
        media: {
            height: 200,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems:'center',
            position: 'relative'

        },
        cardAction: {
            display: 'flex',
            justifyContent: 'space-between',
            backgroundSize: 'contain'
        },
        title: {
            fontSize: '15px'
        },
        image: {
            width: "70%"
        }

    }),
);
const Item:FC<cartTypeProps> = ({cart}) => {
    const classes = useStyles();
    const {descrip, image, prise, subTitle, title} = cart
    const dispatch = useAppDispatch();

    const onClickHandler = () => {
        dispatch(addCartItem({cart}))
        console.log('clock')
    }
    console.log(cart)
    return (
        <>
            <Card className={classes.card}>
                <CardHeader

                    className={classes.title}
                    title={title}
                    subheader={subTitle}
                />
                <div className={classes.media}>
                    {image ? (
                        <CardMedia
                            component="img"
                            className={classes.image}
                            alt="Contemplative Reptile"

                            image={image}
                            title={subTitle}
                        />
                    ) : (
                        <span>Load</span>
                    )}
                </div>

                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="h4">
                        {descrip ?  descrip : ''}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing className={classes.cardAction}>
                    <Typography variant="h5" component="p">
                        Price: {prise}₽
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