import { createSlice } from "@reduxjs/toolkit"
import { localMultiplayerContext } from "../constants/GameConstant.constant"


const ticTacToeSlice = createSlice
    ({
        name: "tic_tac_toe",
        initialState: {
            context: localMultiplayerContext,
        },
        reducers: {
            updateContext(state, action) {
                state.context = action.payload.contextState
            }
        }
    })

export const ticTacToeActions = ticTacToeSlice.actions

export default ticTacToeSlice