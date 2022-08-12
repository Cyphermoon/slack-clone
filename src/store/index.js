import { configureStore } from "@reduxjs/toolkit";
import roomSlice from "./room_slice";
import workSpaceSlice from "./workspace_slice";

const store = configureStore({
    reducer: {
        room: roomSlice.reducer,
        workspace: workSpaceSlice.reducer
    }
});

store.subscribe(() => {
    console.log("Store State ->", store.getState())
})


export default store;