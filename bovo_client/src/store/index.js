import { configureStore } from "@reduxjs/toolkit";
import logoutReducer from './logout/LogeoutSlice';

export const store = configureStore({
    reducer: {
        logout: logoutReducer,
    }
})