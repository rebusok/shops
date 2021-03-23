import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {API} from "../../Api/Api";
import {ShopItemType} from "../main/shopReducer";
import {AxiosError} from "axios";

export interface CartItemType extends ShopItemType {
    count: number
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type OrderValues = {
    name: string
    surname: string
    address: string
    phone: string
    other: string
    carts: Array<CartItemType>
}


export const fetchSendMail = createAsyncThunk<undefined, OrderValues, { rejectValue: { errors: Array<string> } }>('auth/login', async (param, thunkAPI) => {

    const res = await API.sendMail(param)
    try {
        if (res.status === 200) {

            return
        } else {
            return thunkAPI.rejectWithValue({errors: res.data.messages})
        }

    } catch (e) {
        const error: AxiosError = e
        return thunkAPI.rejectWithValue({errors: [error.message]})
    }
})

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
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchSendMail.fulfilled, (state) => {
            localStorage.removeItem('cartUser')
           return []
        })
    }
})

export const cartReducer = slice.reducer
export const {addCartItem, deleteCartItem, fetchCartItems} = slice.actions