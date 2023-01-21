import React, { useReducer, useState } from 'react'
import { useEffect } from 'react';
import { countAvailableMove, gameBoardReducer, getAvailableMoves, initBoard, isBoardFull, isWinningMove } from '../../lib/gameUtil.lib';
import MessageModal from '../modals/MessageModal';
import { StyledGameBoardSection } from './styles/game.style';
import TicTacToeBoard from './TicTacToeBoard';

const AIMultiplayerTicTacToeBoard = ({ players, setPlayers }) => {
    const [currentPlayer, setCurrentPlayer] = useState(players["player1"]);
    const [boardOpened, setBoardOpened] = useState(true)
    const [winner, setGameWinner] = useState()
    const [isDraw, setIsDraw] = useState(false)
    const isXCurrentPlayer = currentPlayer.letter === players["player1"].letter
    const isCompTurn = currentPlayer.letter === players["player2"].letter
    const X = "x"
    const O = "o"
    let sim_winner = ""

    const [gameBoard, setGameBoard] = useReducer(gameBoardReducer, null, initBoard)

    useEffect(() => {
        if (!isCompTurn) return

        let position = generateComputerMove(gameBoard)

        if (position && !winner) disableCell(position)
        setGameBoard({ type: "update", position, value: currentPlayer.letter })
        let result = gameBoardReducer(gameBoard, { type: "update", position, value: currentPlayer.letter })

        checkBoardState(result, currentPlayer)

        setCurrentPlayer(isXCurrentPlayer ? players["player2"] : players["player1"])

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPlayer.letter])

    const restartGame = () => {
        setGameWinner("");
        setBoardOpened(true)
        setIsDraw(false)

        let cells = document.querySelectorAll("div.tic_tac_toe_cell")

        cells.forEach((cell) => {
            cell.classList.remove("x")
            cell.classList.remove("o")
            cell.style.pointerEvents = "auto"
        })

        setGameBoard({ type: "reset" })
    }

    const disableCell = (id) => {
        let cell = document.getElementById(`${id}`)

        if (cell.style) cell.style.pointerEvents = "none"
    }

    const checkBoardState = (result, currentPlayer) => {
        let _isWinningMove = isWinningMove(result, currentPlayer.letter)
        if (_isWinningMove) {
            setGameWinner(currentPlayer.name)
            setPlayers({ type: "SCORE", player: currentPlayer.id })
            setBoardOpened(false)
        }
        else if (!_isWinningMove && isBoardFull(result)) {
            setIsDraw(true)
            setBoardOpened(false)
        }
    }


    function miniMax(board, player) {
        let maxPlayer = "o"
        let otherPlayer = player === X ? O : X
        let best

        if (sim_winner === otherPlayer) {
            return {
                position: null,
                score: otherPlayer === maxPlayer ? 1 * (countAvailableMove(board) + 1) : -1 * (countAvailableMove(board) + 1)
            }
        }


        if (isBoardFull(board)) return { position: null, score: 0 }

        if (player === maxPlayer) best = { position: null, score: Number.NEGATIVE_INFINITY }

        else best = { position: null, score: Number.POSITIVE_INFINITY }

        for (let availableMove of getAvailableMoves(board)) {
            board[availableMove] = player
            if (isWinningMove(board, player)) sim_winner = player
            let sim_score = miniMax(board, otherPlayer)

            board[availableMove] = ""
            sim_winner = ""
            sim_score["position"] = availableMove

            if (player === maxPlayer) {
                if (sim_score["score"] > best["score"]) {
                    best = sim_score
                }
            }
            else {
                if (sim_score["score"] < best["score"]) {
                    best = sim_score
                }
            }
        }
        return best
    }

    const generateComputerMove = (gameBoard) => {
        let availableMoves = getAvailableMoves(gameBoard)
        if (availableMoves.length === 9) return availableMoves[Math.round(Math.random() * availableMoves.length - 1)]

        else return miniMax(gameBoard, "o")["position"]
    }

    const handleCellClicked = (e, position, value) => {
        setGameBoard({ type: "update", position, value })
        let result = gameBoardReducer(gameBoard, { type: "update", position, value })

        position = generateComputerMove(result)

        checkBoardState(result, currentPlayer)

        setCurrentPlayer(isXCurrentPlayer ? players["player2"] : players["player1"])
        e.target.style.pointerEvents = "none"
    }



    return (
        <StyledGameBoardSection>
            <span className='current_user'>{isXCurrentPlayer ? `${players["player1"].name}` :
                `${players["player2"].name}'s`} Turn</span>

            {boardOpened &&
                <TicTacToeBoard
                    gameBoard={gameBoard}
                    handleCellClicked={(e, position) => handleCellClicked(e, position, currentPlayer.letter)} />
            }

            {winner && <MessageModal message={`${winner} won the game`} />}
            {isDraw && <MessageModal message={`This match is a draw`} />}

            <button
                onClick={restartGame}
                className='restart_game'>Restart Game</button>
        </StyledGameBoardSection>
    )
}

export default AIMultiplayerTicTacToeBoard