
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

export const initBoard = () => {
    let board = {}

    for (let i = 1; i < 10; i++) {
        board[i] = ""
    }
    return board
}

export const initPlayers = () => {
    let players = {
        player1: {
            id: "player1",
            name: "Player 1",
            score: 0,
            letter: "x"
        },
        player2: {
            id: "player2",
            name: "Player 2",
            score: 0,
            letter: "o"
        }
    }

    return players
}

export const playersReducer = (initialState, action) => {
    let playerId = action.player

    if (action.type === "SCORE") {
        return {
            ...initialState,

            [playerId]: {
                ...initialState[playerId],
                score: initialState[playerId].score += 1
            }
        }

    }

    else if (action.type === "serverUpdate") {
        return {
            player1: {
                ...action["newPlayers"]["player1"]
            },
            player2: {
                ...action["newPlayers"]["player2"]
            }
        }
    }

    return initialState
}
