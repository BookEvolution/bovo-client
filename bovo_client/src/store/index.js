import { configureStore } from "@reduxjs/toolkit";
import logoutReducer from './logout/LogoutSlice';
import bookReducer from "./bookForum/BookSlice"; // bookSlice import

export const store = configureStore({
    reducer: {
        logout: logoutReducer,
        book: bookReducer
    }
})