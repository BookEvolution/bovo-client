import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatMessages: [], // 초기값으로 로컬 스토리지에서 복원
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
        state.chatMessages.push(action.payload);
    },
    clearChat: (state) => {
      state.chatMessages = [];
      sessionStorage.removeItem('chatMessages'); // 로컬 스토리지에서 메시지 제거
    },
  },
});

export const { addMessage, clearChat } = chatSlice.actions;
export default chatSlice.reducer;