import { createSlice } from "@reduxjs/toolkit"


const otherUserSlice = createSlice
    ({
        name: "other_user",
        initialState: {
            name: null,
        },
        reducers: {
            updateOtherUserName(state, action) {
                state.name = action.payload.name
            }
        }
    })

export const otherUserActions = otherUserSlice.actions

export default otherUserSlice