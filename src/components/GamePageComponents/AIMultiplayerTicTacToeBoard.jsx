import React, { useReducer, useState } from 'react'
import { useEffect } from 'react';
import { gameBoardReducer, initBoard, isBoardFull, isWinningMove } from '../../lib/gameUtil.lib';
import MessageModal from '../modals/MessageModal';
import TicTacToeBoard from './TicTacToeBoard';
import { StyledBoardSection } from './TicTacToeMultiplayerBoard';

const AIMultiplayerTicTacToeBoard = ({players, setPlayers}) => {
    const [currentPlayer, setCurrentPlayer] = useState(players["player1"]);
    const [boardOpened, setBoardOpened] = useState(true)
    const [winner, setGameWinner] = useState()
    const [isDraw, setIsDraw] = useState(false)
    const isXCurrentPlayer = currentPlayer.letter === players["player1"].letter
    const isCompTurn = currentPlayer.letter === players["player2"].letter
  
    const [gameBoard, setGameBoard] = useReducer(gameBoardReducer, null, initBoard)

    useEffect(() => {
        if(!isCompTurn) return

       let position = generateComputerMove(gameBoard)
   
       setGameBoard({ type: "update", position, value : currentPlayer.letter })
       let result = gameBoardReducer(gameBoard, { type: "update", position, value : currentPlayer.letter })

       checkBoardState(result, currentPlayer)

       setCurrentPlayer(isXCurrentPlayer ? players["player2"] : players["player1"])

       if(position) disableCell(position)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPlayer.letter] )
  
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

        cell.style.pointerEvents = "none"
    }

    const checkBoardState = (result, currentPlayer) => {
        if (isWinningMove(result, currentPlayer.letter)) {
            setGameWinner(currentPlayer.name)
            setPlayers({ type: "SCORE", player: currentPlayer.id })
            setBoardOpened(false)
        }
        else if (isBoardFull(result)) {
            setIsDraw(true)
            setBoardOpened(false)
        }
    }

    const generateComputerMove = (gameBoard) => {
        for(let position in gameBoard){
            if(!gameBoard.hasOwnProperty(position)) continue

            if(gameBoard[position] === "") return position
        }
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
        <StyledBoardSection>
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
        </StyledBoardSection>
  )
}

export default AIMultiplayerTicTacToeBoard