import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { initBoard } from "./gameUtil.lib"

export const updateOnlineGameBoard = async (board, gameId) => {
    const gameDataRef = doc(db, "ticTacToeGames", gameId)

    let result = await updateDoc(gameDataRef, {
        gameBoard: board
    }, { merge: true })

    return result
}

export const updateOnlineCurrentPlayer = async (gameId, newPlayer) => {
    const gameDataRef = doc(db, "ticTacToeGames", gameId)

    let result = await updateDoc(gameDataRef, {
        currentPlayer: newPlayer
    })

    return result

}

export const incrementOnlineCurrentPlayerScore = async (gameId, playerId, score) => {
    const gameDataRef = doc(db, "ticTacToeGames", gameId)

    let result = await updateDoc(gameDataRef, {
        [`players.${playerId}.score`]: score
    })

    return result
}

export const resetOnlineCurrentPlayerScore = async (gameId) => {
    const gameDataRef = doc(db, "ticTacToeGames", gameId)

    let result = await updateDoc(gameDataRef, {
        "players.player1.score": 0,
        "players.player2.score": 0
    })

    return result
}

export const updateOnlineBoardOpenedState = async (gameId, state) => {
    const gameDataRef = doc(db, "ticTacToeGames", gameId)

    let result = await updateDoc(gameDataRef, {
        boardOpened: state
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
