import React, { useReducer } from 'react'
import styled from 'styled-components'
import GameBoard from './GameBoard'
import ScoreBoard from './ScoreBoard'

const GameBody = () => {
  const initPlayers = () => {
    const players = {
      player1: {
        id : "player1",
        name : "Cypher Moon",
        score : 0, 
        letter : "x"
      },
      player2: {
        id : "player2",
        name : "Seun",
        score : 0, 
        letter : "o"
      }
    }

    return players
  }

  const playersReducer = (initialState, action) => {
    let playerId = action.player
  
    if(action.type === "SCORE"){
      console.log("updating score")
      return {
        ...initialState,
        
        [playerId] :{
          ...initialState[playerId],
          score: initialState[playerId].score += 1
        }
      }
        
    }

    return initialState
  }

  const [players, setPlayers] = useReducer(playersReducer, null, initPlayers)

  return (
    <StyledMain>
        <ScoreBoard players={players} />
        <GameBoard players={players} setPlayers={setPlayers} />
    </StyledMain>
  )
}

const StyledMain = styled.main`
  --header-height:42px;
  height:calc(100% - var(--header-height));
  display:flex;
  align-items:center;
  justify-content:center;
`

export default GameBody