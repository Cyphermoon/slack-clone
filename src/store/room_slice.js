import { createSlice } from "@reduxjs/toolkit";


const roomSlice = createSlice({
    name: "room",
    initialState: {
        id: 0
    },
    reducers: {
        selectChannel() {

        }
    }
})

export const RoomActions = roomSlice.actions;

export default roomSlice