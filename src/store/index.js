import { configureStore } from "@reduxjs/toolkit";
import chatContextSlice from "./chat_slice";
import otherUserSlice from "./other_user_slice";
import roomSlice from "./room_slice";
import userSlice from "./user_slice";
import workSpaceSlice from "./workspace_slice";

const store = configureStore({
    reducer: {
        room: roomSlice.reducer,
        workspace: workSpaceSlice.reducer,
        user: userSlice.reducer,
        chatContext: chatContextSlice.reducer,
        otherUser: otherUserSlice.reducer
    }
});

store.subscribe(() => {
    console.log("Store State ->", store.getState())
})


export default store;