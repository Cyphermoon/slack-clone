import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"


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


