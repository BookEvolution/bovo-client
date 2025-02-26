import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogout: false,
}

const logoutSlice = createSlice({
    name: 'logout',
    initialState,
    reducers: {
        toggleLogoutModal: (state, action) => {
            state.isLogout = action.payload;
        }
    }
})

export const { toggleLogoutModal } = logoutSlice.actions;
export default logoutSlice.reducer;