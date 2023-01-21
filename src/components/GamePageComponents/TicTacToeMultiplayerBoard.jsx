
import React, { useState } from 'react'
import { gameBoardReducer, initBoard, isBoardFull, isWinningMove } from '../../lib/gameUtil.lib';
import { useReducer } from 'react';
import MessageModal from '../modals/MessageModal';
import TicTacToeBoard from './TicTacToeBoard';
import { StyledGameBoardSection } from './styles/game.style';

const TicTacToeMultiplayerBoard = ({ players, setPlayers }) => {
  const [currentPlayer, setCurrentPlayer] = useState(players["player1"]);
  const [boardOpened, setBoardOpened] = useState(true)
  const [winner, setGameWinner] = useState()
  const [isDraw, setIsDraw] = useState(false)
  const isXCurrentPlayer = currentPlayer.letter === players["player1"].letter

  const [gameBoard, setGameBoard] = useReducer(gameBoardReducer, null, initBoard)

  const restartGame = () => {
    setGameWinner(undefined);
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

  const handleCellClicked = (e, position, value) => {
    setGameBoard({ type: "update", position, value })

    let result = gameBoardReducer(gameBoard, { type: "update", position, value })

    if (isWinningMove(result, currentPlayer.letter)) {
      setGameWinner(currentPlayer)
      setPlayers({ type: "SCORE", player: currentPlayer.id })
      setBoardOpened(false)
    }
    else if (isBoardFull(result)) {
      setIsDraw(true)
      setBoardOpened(false)
    }

    setCurrentPlayer(isXCurrentPlayer ? players["player2"] : players["player1"])
    e.target.style.pointerEvents = "none"
  }

  return (
    <StyledGameBoardSection>
      <span className='current_user'>{currentPlayer.id === "player1" ? `${players["player1"].name}` :
        `${players["player2"].name}'s`} Turn</span>

      {boardOpened &&
        <TicTacToeBoard
          gameBoard={gameBoard}
          handleCellClicked={(e, position) => handleCellClicked(e, position, currentPlayer.letter)} />
      }

      {winner && <MessageModal message={`${winner?.name} won the game`} />}
      {isDraw && <MessageModal message={`This match is a draw`} />}

      <button
        onClick={restartGame}
        className='restart_game'>Restart Game</button>
    </StyledGameBoardSection>
  )
}


export default TicTacToeMultiplayerBoard