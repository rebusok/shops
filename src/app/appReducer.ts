import {createSlice} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

interface InitialStateType {
    status:RequestStatusType,
    error: null | string
    isInitialized: boolean
}


const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'loading',
        error: null,
        isInitialized: false
    } as InitialStateType,
    reducers: {

    }
})

export const appReducer = slice.reducer