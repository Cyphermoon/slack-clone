import { createSlice } from "@reduxjs/toolkit"
import { AIMultiplayerContext } from "../constants/GameConstant.constant"


const ticTacToeSlice = createSlice
    ({
        name: "tic_tac_toe",
        initialState: {
            context: AIMultiplayerContext,
            gameId: "oPVDWoSc58tRkSMktYGZ",
            isFinishGameClicked: false,
        },
        reducers: {
            updateContext(state, action) {
                state.context = action.payload.contextState
            },
            updateGameId(state, action) {
                state.gameId = action.payload.id
            },
            updateFinishGameClicked(state, action) {
                state.isFinishGameClicked = action.payload.isClicked
            }
        }
    })

export const ticTacToeActions = ticTacToeSlice.actions

export default ticTacToeSlice