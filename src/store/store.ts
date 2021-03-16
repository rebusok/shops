import {combineReducers} from "redux";
import {shopReducer} from "../pages/main/shopReducer";
import {appReducer} from "../app/appReducer";
import {authReducer} from "../pages/auth/authReducer";
import {cartReducer} from "../pages/cart/cartReducer";
import {configureStore} from "@reduxjs/toolkit";
import ThunkMiddleware from "redux-thunk";
import {useDispatch} from "react-redux";

const rootReducer =combineReducers({
    shop:shopReducer,
    app: appReducer,
    auth: authReducer,
    cart: cartReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware:getDefaultMiddleware => getDefaultMiddleware()
        .prepend(ThunkMiddleware)
})
export type AppRootStateType = ReturnType<typeof rootReducer>
type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()