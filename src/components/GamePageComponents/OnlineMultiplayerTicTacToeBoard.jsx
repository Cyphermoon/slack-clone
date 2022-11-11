import React, { useEffect, useReducer, useState } from 'react'
import { initBoard, isBoardFull, isWinningMove } from '../../lib/gameUtil.lib';
import MessageModal from '../modals/MessageModal';
import TicTacToeBoard from './TicTacToeBoard';
import { StyledBoardSection } from './TicTacToeMultiplayerBoard';
import { currentPlayerReducer, gameBoardReducer, updateOnlineGame } from '../../lib/onlineGameUtil.lib';
import { useSelector } from 'react-redux';

const OnlineMultiplayerTicTacToeBoard = ({players, gameData, isGameDataLoading}) => {
  const currentUserObj = useSelector(state => state.user)
    const [currentPlayer, setCurrentPlayer] = useReducer(currentPlayerReducer, players["player1"])
    const [boardOpened, setBoardOpened] = useState(true)
    const [winner, setGameWinner] = useState()
    const [isDraw, setIsDraw] = useState(false)
    const ticTacToeGameId = useSelector(state => state.ticTacToe.gameId)
    const isXCurrentPlayer = currentPlayer.letter === players["player1"].letter
    const isCurrentUserPlayer = currentPlayer.userId === currentUserObj.userId

    const [gameBoard, setGameBoard] = useReducer(gameBoardReducer, null, initBoard)

    useEffect(() => {
      if(isGameDataLoading) return

      setGameBoard({type:"serverUpdate", newBoard: gameData.data()["gameBoard"]})
      let result = gameBoardReducer(gameBoard, {type:"serverUpdate", newBoard: gameData.data()["gameBoard"]})

      setBoardOpened(gameData.data()["boardOpened"])
      setCurrentPlayer({ type:"changeCurrentPlayer",  newPlayer:gameData.data()["currentPlayer"]})
      setGameWinner(gameData.data()["winner"])
      setIsDraw(gameData.data()["isDraw"])

      const previousPlayer = currentPlayer

      let _isWiningMove = isWinningMove(result, previousPlayer.letter)

      if (_isWiningMove) {
        updateOnlineGame(ticTacToeGameId, "winner", previousPlayer.name)
        let score = previousPlayer.score + 1
        updateOnlineGame(ticTacToeGameId, `players.${previousPlayer.id}.score`, score)
        updateOnlineGame(ticTacToeGameId, "boardOpened", false)
        return
      }
      else if (!_isWiningMove && isBoardFull(result)) {
        updateOnlineGame(ticTacToeGameId, "isDraw", true)
        updateOnlineGame(ticTacToeGameId, "boardOpened", false)
        console.log("draw")
      }
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameData, isGameDataLoading])

 
    const restartGame = () => {
      let result = gameBoardReducer(gameBoard, { type: "reset" })
      updateOnlineGame( ticTacToeGameId, "gameBoard", result,)
      updateOnlineGame(ticTacToeGameId, "winner", "")
      updateOnlineGame(ticTacToeGameId, "isDraw", false)
  
      let cells = document.querySelectorAll("div.tic_tac_toe_cell")
  
      cells.forEach((cell) => {
        cell.classList.remove("x")
        cell.classList.remove("o")
        cell.style.pointerEvents = "auto"
      })

      updateOnlineGame(ticTacToeGameId, "boardOpened", true)
    }

    // const finishGame = () => {
    //   restartGame()
    //   resetOnlineCurrentPlayerScore(ticTacToeGameId)
    // }

    const handleCellClicked = async (e, position, value) => {
      let result = gameBoardReducer(gameBoard, { type: "update", position, value })
      updateOnlineGame(ticTacToeGameId, "gameBoard", result )
      
      let playerCalculatedRes = currentPlayerReducer(currentPlayer, isXCurrentPlayer ? 
        { type:"changeCurrentPlayer",  newPlayer:players["player2"]} : 
        { type:"changeCurrentPlayer",  newPlayer:players["player1"]} )

      updateOnlineGame(ticTacToeGameId, "currentPlayer", playerCalculatedRes)

      e.target.style.pointerEvents = "none"
    }
  
    return (
      <StyledBoardSection className={`${!isCurrentUserPlayer && "disabled"}`}>
        <span className='current_user'>{isXCurrentPlayer ? `${players["player1"].name}` :
          `${players["player2"].name}'s`} Turn</span>
  
        {boardOpened &&
          <TicTacToeBoard
            gameBoard={!isGameDataLoading && gameBoard}
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

export default OnlineMultiplayerTicTacToeBoard