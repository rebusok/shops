import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API} from "../../Api/Api";

export interface ShopItemType{
    image: string,
    title: string,
    descrip: string
    price: number
}

export const getShopList = createAsyncThunk('shop/getShopList', async (param, {dispatch, rejectWithValue}) => {
    try {
        const res = await API.getShopList()
        if (res.status === 200) {
            return {chopList: res.data}
        } else {
            return rejectWithValue({})
        }
    } catch (e) {
        return rejectWithValue({})
    }
})

const slice = createSlice({
    name: 'shop',
    initialState: [] as Array<ShopItemType>,
    reducers: {
    },
    extraReducers:builder => {
        builder.addCase(getShopList.fulfilled, (state, action) => {
            return action.payload.chopList
        })
    }
})

export const shopReducer = slice.reducer