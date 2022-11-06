
export const isWinningMove = (gameBoard, currentPlayer) => {
    let winningMoves = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ]


    return winningMoves.some((move) => {
        return (
            (gameBoard[move[0]] === currentPlayer) &&
            (gameBoard[move[1]] === currentPlayer) &&
            (gameBoard[move[2]] === currentPlayer)
        )
    })
}

export const isBoardFull = (gameBoard) => {
    for (let prop in gameBoard) {
        if (gameBoard.hasOwnProperty(prop)) {
            if (gameBoard[prop] === "") return false
        }
    }
    return true
}
