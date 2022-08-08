import { configureStore } from "@reduxjs/toolkit";
import roomSlice from "./room_slice";

const store = configureStore({
    reducer: {
        room: roomSlice.reducer
    }
});

store.subscribe(() => {
    console.log("Store State ->", store.getState())
})


export default store;