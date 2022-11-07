import { createSlice } from "@reduxjs/toolkit"
import { OnlineMultiplayerContext } from "../constants/GameConstant.constant"


const ticTacToeSlice = createSlice
    ({
        name: "tic_tac_toe",
        initialState: {
            context: OnlineMultiplayerContext,
        },
        reducers: {
            updateContext(state, action) {
                state.context = action.payload.contextState
            }
        }
    })

export const ticTacToeSliceActions = ticTacToeSlice.actions

export default ticTacToeSlice