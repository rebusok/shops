import React, {useEffect} from 'react';
import './App.css';
import {getShopList} from "../pages/main/shopReducer";
import {AppRootStateType, useAppDispatch} from "../store/store";
import {useSelector} from "react-redux";
import Header from "../components/header";
import Routes from "../routes";


function App() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getShopList())
    }, [dispatch])
    const shopList = useSelector((state:AppRootStateType) => state.shop)
    console.log(shopList)
  return (
    <div className="App">
      <header>
          <Header/>
      </header>
        <Routes/>
    </div>
  );
}

export default App;
