import React, {FC} from 'react';
import {
    createStyles,
    makeStyles,
    Theme,
} from "@material-ui/core";
import ItemList from '../../components/itemList';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            marginTop: 20
        }
    }),
);


const Main:FC = () => {

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <ItemList/>
        </div>
    );
};

export default Main;