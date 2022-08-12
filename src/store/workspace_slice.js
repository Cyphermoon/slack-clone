import { createSlice } from "@reduxjs/toolkit";


const workSpaceSlice = createSlice({
    name: "workspace",
    initialState: {
        activeId: "0eE73qo5t4Xmx9a7PoUF",
    },
    reducers: {
        setActiveId(state, action) {
            state.activeId = action.payload.id
        }
    }
})

export const workSpaceActions = workSpaceSlice.actions

export default workSpaceSlice