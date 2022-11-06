
import React, { useState } from 'react'
import { isBoardFull, isWinningMove } from '../../lib/gameUtil.lib';
import { useReducer } from 'react';
import styled from 'styled-components'
import MessageModal from '../modals/MessageModal';
import TicTacToeBoard from './TicTacToeBoard';

const TicTacToeMultiplayerBoard = ({ players, setPlayers }) => {
  const [currentPlayer, setCurrentPlayer] = useState(players["player1"]);
  const [boardOpened, setBoardOpened] = useState(true)
  const [winner, setGameWinner] = useState()
  const [isDraw, setIsDraw] = useState(false)
  const isXCurrentPlayer = currentPlayer.letter === players["player1"].letter

  const initBoard = () => {
    let board = {}

    for (let i = 1; i < 10; i++) {
      board[i] = ""
    }
    return board
  }

  const gameBoardReducer = (initialState, action) => {
    let pos = action.position

    if (action.type === "update") {
      return {
        ...initialState,
        [pos]: action.value
      }
    }

    else if (action.type === "reset") {
      return initBoard()
    }

  }

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
    <StyledBoardSection>
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
    </StyledBoardSection>
  )
}

const StyledBoardSection = styled.section`
    --board-color:#f4f4f4;
    width:100%;
    text-align:center;
    max-width:400px;
    background-color:red;
    border-radius:20px;
    padding:1em .5em;

    & > * + *{
      margin-top:2em;
    }

    .current_user,
    .restart_game{
        display:inline-block;
        color:var(--board-color);
        font-weight:500;
        font-size:.88rem;
    }

    .restart_game{
      outline:none;
      border:none;
      padding:.5em .35em;
      border-radius:15px;
      text-align:center;
      background-color:var(--board-color);
      color:black;
      cursor:pointer;
    }
`




export default TicTacToeMultiplayerBoard