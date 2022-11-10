import React, { useEffect, useReducer, useState } from 'react'
import { initBoard, isBoardFull, isWinningMove } from '../../lib/gameUtil.lib';
import MessageModal from '../modals/MessageModal';
import TicTacToeBoard from './TicTacToeBoard';
import { StyledBoardSection } from './TicTacToeMultiplayerBoard';
import { currentPlayerReducer, gameBoardReducer, incrementOnlineCurrentPlayerScore, resetOnlineCurrentPlayerScore, updateOnlineCurrentPlayer, updateOnlineBoardOpenedState, updateOnlineGameBoard } from '../../lib/onlineGameUtil.lib';

const OnlineMultiplayerTicTacToeBoard = ({players, setPlayers, gameData, isGameDataLoading}) => {
    const [currentPlayer, setCurrentPlayer] = useReducer(currentPlayerReducer, players["player1"])
    const [boardOpened, setBoardOpened] = useState(true)
    const [winner, setGameWinner] = useState()
    const [isDraw, setIsDraw] = useState(false)
    const ticTacToeGameId = "oPVDWoSc58tRkSMktYGZ"
    const isXCurrentPlayer = currentPlayer.letter === players["player1"].letter

    const [gameBoard, setGameBoard] = useReducer(gameBoardReducer, null, initBoard)

    useEffect(() => {
      if(isGameDataLoading) return

      setBoardOpened(gameData.data()["boardOpened"])

      setGameBoard({type:"serverUpdate", newBoard: gameData.data()["gameBoard"]})
      let result = gameBoardReducer(gameBoard, {type:"serverUpdate", newBoard: gameData.data()["gameBoard"]})

      setCurrentPlayer({ type:"changeCurrentPlayer",  newPlayer:gameData.data()["currentPlayer"]})

      const previousPlayer = currentPlayer

      if (isWinningMove(result, previousPlayer.letter)) {
        setGameWinner(previousPlayer)
        let score = previousPlayer.score + 1
        incrementOnlineCurrentPlayerScore(ticTacToeGameId, previousPlayer.id, score)
        updateOnlineBoardOpenedState(ticTacToeGameId, false)
      }
      else if (isBoardFull(result)) {
        setIsDraw(true)
        updateOnlineBoardOpenedState(ticTacToeGameId, false)
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameData, isGameDataLoading])

 
    const restartGame = () => {
      setGameWinner(undefined);
      setIsDraw(false)
  
      let cells = document.querySelectorAll("div.tic_tac_toe_cell")
  
      cells.forEach((cell) => {
        cell.classList.remove("x")
        cell.classList.remove("o")
        cell.style.pointerEvents = "auto"
      })

      let result = gameBoardReducer(gameBoard, { type: "reset" })
      updateOnlineGameBoard(result, ticTacToeGameId)
      updateOnlineBoardOpenedState(ticTacToeGameId, true)
    }

    const finishGame = () => {
      restartGame()
      resetOnlineCurrentPlayerScore(ticTacToeGameId)
    }

  
    const handleCellClicked = async (e, position, value) => {
      let result = gameBoardReducer(gameBoard, { type: "update", position, value })
      updateOnlineGameBoard(result, ticTacToeGameId)
      
      let playerCalculatedRes = currentPlayerReducer(currentPlayer, isXCurrentPlayer ? 
        { type:"changeCurrentPlayer",  newPlayer:players["player2"]} : 
        { type:"changeCurrentPlayer",  newPlayer:players["player1"]} )

      updateOnlineCurrentPlayer(ticTacToeGameId, playerCalculatedRes)

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