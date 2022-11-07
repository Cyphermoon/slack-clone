import { createSlice } from "@reduxjs/toolkit"


const userSlice = createSlice
    ({
        name: "user",
        initialState: {
            userId: null,
            userName: null,
        },
        reducers: {
            updateUserId(state, action) {
                state.userId = action.payload.id
            },

            updateUserName(state, action) {
                state.userName = action.payload.name
            }
        }
    })

export const currentUserActions = userSlice.actions

export default userSlice