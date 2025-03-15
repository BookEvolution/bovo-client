import { configureStore } from "@reduxjs/toolkit";
import logoutReducer from './logout/LogoutSlice.js';
import bookReducer from "./bookForum/BookSlice.js"; // bookSlice import
import chatReducer from "./chatInfo/ChatSlice.js";

export const store = configureStore({
    reducer: {
        logout: logoutReducer,
        book: bookReducer,
        chat: chatReducer,
    }
})