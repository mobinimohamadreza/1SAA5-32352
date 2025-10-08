import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import chargeSlice from "@/Module/Charge/Store/chargeSlice";
import languageSlice from "@/Module/Language/Store/languageSlice";

export const store = configureStore({
    reducer: {
        charge: chargeSlice,
        language: languageSlice
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
