import { createSlice } from "@reduxjs/toolkit"


const userSlice = createSlice
    ({
        name: "user",
        initialState: {
            userId: null,
        },
        reducers: {
            updateUserId(state, action) {
                state.userId = action.payload.id
            }
        }
    })

export const userActions = userSlice.actions

export default userSlice