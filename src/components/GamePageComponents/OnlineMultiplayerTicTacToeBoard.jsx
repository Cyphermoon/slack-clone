/* eslint-disable no-unused-vars */
import React, { useEffect, useReducer, useState } from 'react'
import { collection, doc, orderBy, query, setDoc } from 'firebase/firestore'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { initBoard, isBoardFull, isWinningMove } from '../../lib/gameUtil.lib';
import MessageModal from '../modals/MessageModal';
import TicTacToeBoard from './TicTacToeBoard';
import { StyledBoardSection } from './TicTacToeMultiplayerBoard';
import { db } from '../../firebase';
import { updateOnlineGameBoard } from '../../lib/onlineGameUtil.lib';

const OnlineMultiplayerTicTacToeBoard = ({players, setPlayers}) => {
    const [currentPlayer, setCurrentPlayer] = useState(players["player1"]);
    const [boardOpened, setBoardOpened] = useState(true)
    const [winner, setGameWinner] = useState()
    const [isDraw, setIsDraw] = useState(false)
    const isXCurrentPlayer = currentPlayer.letter === players["player1"].letter

    const [gameData, isGameDataLoading] = useDocument(
    query(doc(db, "ticTacToeGames", "oPVDWoSc58tRkSMktYGZ"))
    );
    
    const gameBoardReducer = (initialState, action) => {
      let pos = action.position
  
      if (action.type === "update") {
        return {
          ...initialState,
          [pos]: action.value
        }
      }

      else if (action.type === "serverUpdate"){
        return {
          ...action["newBoard"]
        }
      }
  
      else if (action.type === "reset") {
        return initBoard()
      }
  
    }

    const [gameBoard, setGameBoard] = useReducer(gameBoardReducer, null, initBoard)

    useEffect(() => {
      if(isGameDataLoading) return

      setGameBoard({type:"serverUpdate", newBoard: gameData.data()["gameBoard"]})
      let result = gameBoardReducer(gameBoard, {type:"serverUpdate", newBoard: gameData.data()["gameBoard"]})

      if (isWinningMove(result, "x")) {
        setGameWinner(currentPlayer)
        setPlayers({ type: "SCORE", player: currentPlayer.id })
        setBoardOpened(false)
      }
      else if (isBoardFull(result)) {
        setIsDraw(true)
        setBoardOpened(false)
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameData, isGameDataLoading])

 

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

      setGameBoard({type:"reset"})
      let result = gameBoardReducer(gameBoard, { type: "reset" })
      updateOnlineGameBoard(result, "oPVDWoSc58tRkSMktYGZ")
    }

  
    const handleCellClicked = async (e, position, value) => {
      setGameBoard({ type: "update", position, value })

      let result = gameBoardReducer(gameBoard, { type: "update", position, value })

      updateOnlineGameBoard(result, "oPVDWoSc58tRkSMktYGZ")
      
      setCurrentPlayer(isXCurrentPlayer ? players["player2"] : players["player1"])
      e.target.style.pointerEvents = "none"
    }
  
    return (
      <StyledBoardSection>
        <span className='current_user'>{isXCurrentPlayer ? `${players["player1"].name}` :
          `${players["player2"].name}'s`} Turn</span>
  
        {boardOpened &&
          <TicTacToeBoard
            gameBoard={!isGameDataLoading && gameBoard}
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