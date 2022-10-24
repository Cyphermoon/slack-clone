import { configureStore } from "@reduxjs/toolkit";
import roomSlice from "./room_slice";
import userSlice from "./user_slice";
import workSpaceSlice from "./workspace_slice";

const store = configureStore({
    reducer: {
        room: roomSlice.reducer,
        workspace: workSpaceSlice.reducer,
        user: userSlice.reducer
    }
});

store.subscribe(() => {
    console.log("Store State ->", store.getState())
})


export default store;