import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ShopItemType} from "../main/shopReducer";

export interface CartItemType extends ShopItemType {
    count: number
}

const slice = createSlice({
    name: 'cart',
    initialState: [] as Array<CartItemType>,
    reducers: {
        addCartItem(state, action: PayloadAction<{ cart: ShopItemType }>) {
            const index = state.findIndex(t => t.id === action.payload.cart.id)
            if (index > -1) {
                state[index] = {...state[index], count: state[index].count + 1}
            } else {
                state.push({...action.payload.cart, count: 1})
            }

            localStorage.setItem('cartUser', JSON.stringify(state))
        },
        deleteCartItem(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(t => t.id === action.payload.id)
            if (index > -1) {
                if (state[index].count > 1) {
                    state[index] = {...state[index], count: state[index].count - 1}
                } else {
                    state.splice(index, 1)
                }
            }
            localStorage.setItem('cartUser', JSON.stringify(state))
        },
        fetchCartItems(state, action) {
            return [...state, ...JSON.parse(localStorage.getItem('cartUser') || '[]')]

        }
    }
})

export const cartReducer = slice.reducer
export const {addCartItem, deleteCartItem, fetchCartItems} = slice.actions