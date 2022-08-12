import { createSlice } from "@reduxjs/toolkit";


const workSpaceSlice = createSlice({
    name: "workspace",
    initialState: {
        activeId: null,
    },
    reducers: {
        setActiveId(state, action) {
            state.activeId = action.payload.id
        }
    }
})

export const workSpaceActions = workSpaceSlice.actions

export default workSpaceSlice