import { createSlice } from "@reduxjs/toolkit";

const chatContextSlice = createSlice({
    name: "chatContext",
    initialState: {
        context: "",
        chatId: null,
    },
    reducers: {
        selectChatContext(state, action) {
            state.context = action.payload.chatContextMode
        },

        selectChatId(state, action) {
            state.chatId = action.payload.chatId
        }
    }
})

export const chatContextActions = chatContextSlice.actions;

export default chatContextSlice