import { doc, setDoc } from "firebase/firestore"
import { db } from "../firebase"

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