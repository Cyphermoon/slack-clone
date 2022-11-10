import { doc, setDoc } from "firebase/firestore"
import { db } from "../firebase"
import { initBoard } from "./gameUtil.lib"

export const updateOnlineGameBoard = async (board, gameId) => {
    const gameDataRef = doc(db, "ticTacToeGames", gameId)

    let result = await setDoc(gameDataRef, {
        gameBoard: board
    }, { merge: true })

    return result
}

export const updateOnlineCurrentPlayer = async (gameId, newPlayer) => {
    const gameDataRef = doc(db, "ticTacToeGames", gameId)

    let result = await setDoc(gameDataRef, {
        currentPlayer: newPlayer
    }, { merge: true })

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
