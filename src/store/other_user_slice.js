import { createSlice } from "@reduxjs/toolkit"


const otherUserSlice = createSlice
    ({
        name: "other_user",
        initialState: {
            name: null,
            id: null,
        },
        reducers: {
            updateOtherUserName(state, action) {
                state.name = action.payload.name
            },

            updateOtherUserId(state, action) {
                state.id = action.payload.id
            }
        }
    })

export const otherUserActions = otherUserSlice.actions

export default otherUserSlice