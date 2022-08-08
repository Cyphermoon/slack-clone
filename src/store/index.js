import { configureStore } from "@reduxjs/toolkit";
import roomSlice from "./room_slice";

const store = configureStore({
    reducer: {
        room: roomSlice.reducer
    }
});

export default store;