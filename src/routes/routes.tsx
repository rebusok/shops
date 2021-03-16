import React, {FC} from 'react';
import {Redirect, Route, Switch} from "react-router";
import Main from '../pages/main';
import Auth from "../pages/auth";
import Cart from '../pages/cart';


export enum RoutingType {
    auth="/auth",
    registration = "/registration",
    profile = "/profile",
    error="/404",
    cart = "/cart",
}

const Routes:FC = () => {

    return (
        <>
            <Switch>
                <Route exact path={'/'} render={() => <Main/>}/>
                <Route exact path={RoutingType.auth} render={() => <Auth/>}/>
                <Route exact path={RoutingType.cart} render={() => <Cart/>}/>
                <Route exact path={RoutingType.error} render={ () =>  <h1>EROOROR</h1>}/>
                <Redirect to={RoutingType.error} from={'*'}/>
            </Switch>
        </>
    );
};

export default Routes;