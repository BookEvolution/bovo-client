import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    book: null, // 선택된 책 정보 저장
};

const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        setBook: (state, action) => {
            state.book = action.payload;
        },
        clearBook: (state) => {
            state.book = null;
        }
    }
});

export const { setBook, clearBook } = bookSlice.actions;
export default bookSlice.reducer;