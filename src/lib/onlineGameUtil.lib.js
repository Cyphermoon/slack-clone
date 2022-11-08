import { doc, setDoc } from "firebase/firestore"
import { db } from "../firebase"

export const updateOnlineGameBoard = async (board, gameId) => {
    const gameDataRef = doc(db, "ticTacToeGames", gameId)

    let result = await setDoc(gameDataRef, {
        gameBoard: board
    }, { merge: true })

    return result
}