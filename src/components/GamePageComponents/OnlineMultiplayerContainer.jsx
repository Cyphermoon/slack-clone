import { query, doc } from 'firebase/firestore'
import React, { useEffect, useReducer } from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'
import { useSelector } from 'react-redux'
import { db } from '../../firebase'
import { initPlayers, playersReducer } from '../../lib/gameUtil.lib'
import OnlineMultiplayerTicTacToeBoard from './OnlineMultiplayerTicTacToeBoard'
import ScoreBoard from './ScoreBoard'
import { StyledContextArea } from './styles/game.style'

const OnlineMultiplayerContainer = () => {
  const ticTacToeGameId = useSelector(state => state.ticTacToe.gameId)

  const [players, setPlayers] = useReducer(playersReducer, null, initPlayers)

  //query and subscribe to this gameId
  const [gameData, isGameDataLoading] = useDocument(
    query(doc(db, "ticTacToeGames", ticTacToeGameId))
  );

  useEffect(() => {
    if (isGameDataLoading) return

    setPlayers(!isGameDataLoading && ({ type: "serverUpdate", newPlayers: gameData.data()["players"] }))


  }, [gameData, isGameDataLoading])

  return (
    <StyledContextArea>
      <ScoreBoard players={players} />
      <OnlineMultiplayerTicTacToeBoard
        gameData={gameData}
        isGameDataLoading={isGameDataLoading}
        players={players} />
    </StyledContextArea>
  )
}


export default OnlineMultiplayerContainer