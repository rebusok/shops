import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {API} from "../../Api/Api";
import {ShopItemType} from "../main/shopReducer";
import {AxiosError} from "axios";

export interface CartItemType extends ShopItemType {
    count: number
}
interface InitialType  {
    status: RequestStatusType
    carts: Array<CartItemType>
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
    thunkAPI.dispatch(setStatusApp({status:'loading'}))
    const res = await API.sendMail(param)
    try {
        if (res.status === 200) {
            thunkAPI.dispatch(setStatusApp({status:'succeeded'}))
            return
        } else {
            thunkAPI.dispatch(setStatusApp({status:'failed'}))
            return thunkAPI.rejectWithValue({errors: res.data.messages})
        }

    } catch (e) {
        thunkAPI.dispatch(setStatusApp({status:'failed'}))
        const error: AxiosError = e
        return thunkAPI.rejectWithValue({errors: [error.message]})
    }
})

const slice = createSlice({
    name: 'cart',
    initialState: {carts: [], status: "succeeded"} as InitialType,
    reducers: {
        addCartItem(state, action: PayloadAction<{ cart: ShopItemType }>) {
            const index = state.carts.findIndex(t => t.id === action.payload.cart.id)
            if (index > -1) {
                state.carts[index] = {...state.carts[index], count: state.carts[index].count + 1}
            } else {
                state.carts.push({...action.payload.cart, count: 1})
            }

            localStorage.setItem('cartUser', JSON.stringify(state.carts))
        },
        deleteCartItem(state, action: PayloadAction<{ id: string }>) {
            const index = state.carts.findIndex(t => t.id === action.payload.id)
            if (index > -1) {
                if (state.carts[index].count > 1) {
                    state.carts[index] = {...state.carts[index], count: state.carts[index].count - 1}
                } else {
                    state.carts.splice(index, 1)
                }
            }
            localStorage.setItem('cartUser', JSON.stringify(state.carts))
        },
        fetchCartItems(state, action) {
            state.carts = [...state.carts, ...JSON.parse(localStorage.getItem('cartUser') || '[]')]
        },
        setStatusApp(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchSendMail.fulfilled, (state) => {
            localStorage.removeItem('cartUser')
           return {...state, carts: []}

        })
    }
})

export const cartReducer = slice.reducer
export const {addCartItem, deleteCartItem, fetchCartItems, setStatusApp} = slice.actions