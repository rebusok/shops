import {createSlice} from "@reduxjs/toolkit";
import {RequestStatusType} from "../../app/appReducer";


interface AuthStateType {
    status:RequestStatusType,
    error: null | string
    isLoggedIn: boolean
}



const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    } as AuthStateType,
    reducers: {
    }
})

export const authReducer = slice.reducer