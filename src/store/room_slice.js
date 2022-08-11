import { createSlice } from "@reduxjs/toolkit";


const roomSlice = createSlice({
    name: "room",
    initialState: {
        roomId: ":r1:"
    },
    reducers: {
        selectChannel(state, action) {
            state.roomId = action.payload.id
        }
    }
})

export const roomActions = roomSlice.actions;

export default roomSlice