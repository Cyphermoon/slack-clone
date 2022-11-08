import { query, doc } from 'firebase/firestore'
import React, { useEffect, useReducer } from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'
import styled from 'styled-components'
import { db } from '../../firebase'
import { initPlayers, playersReducer } from '../../lib/gameUtil.lib'
import OnlineMultiplayerTicTacToeBoard from './OnlineMultiplayerTicTacToeBoard'
import ScoreBoard from './ScoreBoard'

const OnlineMultiplayerContainer = () => {

  const [players, setPlayers] = useReducer(playersReducer, null, initPlayers)

  const [gameData, isGameDataLoading] = useDocument(
    query(doc(db, "ticTacToeGames", "oPVDWoSc58tRkSMktYGZ"))
  );

  useEffect(() => {
    if(isGameDataLoading) return

    setPlayers(!isGameDataLoading && ({type:"serverUpdate", newPlayers:gameData.data()["players"]}))


  }, [gameData, isGameDataLoading])

  return (
    <StyledContextArea>
      <ScoreBoard players={players} />
      <OnlineMultiplayerTicTacToeBoard
        gameData={gameData}
        isGameDataLoading={isGameDataLoading}
        players={players}
        setPlayers={setPlayers} />
    </StyledContextArea>
  )
}

export const StyledContextArea = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
`

export default OnlineMultiplayerContainer