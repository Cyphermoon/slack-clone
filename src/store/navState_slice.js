import { createSlice } from "@reduxjs/toolkit";


const navStateSlice = createSlice({
    name: "navState",
    initialState: {
        isOpen: true,
    },
    reducers: {
        toggleNavState(state) {
            state.isOpen = !state.isOpen
        },
        setNavState(state, action) {
            state.isOpen = action.payload.isOpen
        }
    }
})

export const navStateActions = navStateSlice.actions;

export default navStateSlice