import {createSlice} from "@reduxjs/toolkit";
import {ShopItemType} from "../main/shopReducer";
interface CartItemType extends ShopItemType {
    count: number
}
const slice = createSlice({
    name: 'cart',
    initialState: [] as Array<CartItemType>,
    reducers: {
    }
})

export const cartReducer = slice.reducer