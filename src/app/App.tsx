import React, {useEffect} from 'react';
import './App.css';
import {getShopList} from "../pages/main/shopReducer";
import {useAppDispatch} from "../store/store";
import Header from "../components/header";
import Routes from "../routes";
import {Container} from "@material-ui/core";
import { fetchCartItems } from '../pages/cart/cartReducer';


function App() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getShopList())
        dispatch(fetchCartItems({}))
    }, [dispatch])


    return (
        <div className="App">
            <header>
                <Header/>
            </header>
            <Container maxWidth="xl">
                <Routes/>
            </Container>
        </div>
    );
}

export default App;


