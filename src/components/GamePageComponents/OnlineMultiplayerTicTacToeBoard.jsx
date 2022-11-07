import React, { useReducer, useState } from 'react'
import { isBoardFull, isWinningMove } from '../../lib/gameUtil.lib';
import MessageModal from '../modals/MessageModal';
import TicTacToeBoard from './TicTacToeBoard';
import { StyledBoardSection } from './TicTacToeMultiplayerBoard';

const OnlineMultiplayerTicTacToeBoard = ({players, setPlayers}) => {
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
        <span className='current_user'>{isXCurrentPlayer ? `${players["player1"].name}` :
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

export default OnlineMultiplayerTicTacToeBoard