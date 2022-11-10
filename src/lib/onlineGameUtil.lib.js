import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { initBoard } from "./gameUtil.lib"


export const resetOnlineCurrentPlayerScore = async (gameId) => {
    const gameDataRef = doc(db, "ticTacToeGames", gameId)

    let result = await updateDoc(gameDataRef, {
        "players.player1.score": 0,
        "players.player2.score": 0
    })

    return result
}


export const updateOnlineGame = async (gameId, property, value) => {
    const gameDataRef = doc(db, "ticTacToeGames", gameId)

    let result = await updateDoc(gameDataRef, {
        [property]: value
    })

    return result
}

export const currentPlayerReducer = (initialState, action) => {

    if (action.type === "changeCurrentPlayer") {
        return {
            ...action["newPlayer"]
        }
    }
}

export const gameBoardReducer = (initialState, action) => {
    let pos = action.position

    if (action.type === "update") {
        return {
            ...initialState,
            [pos]: action.value
        }
    }

    else if (action.type === "serverUpdate") {
        return {
            ...action["newBoard"]
        }
    }

    else if (action.type === "reset") {
        return initBoard()
    }

}
