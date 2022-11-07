import React, { useReducer } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { localMultiplayerContext, OnlineMultiplayerContext } from '../../constants/GameConstant.constant'
import OnlineMultiplayerTicTacToeBoard from './OnlineMultiplayerTicTacToeBoard'
import ScoreBoard from './ScoreBoard'

const GameBody = () => {
  const gameContext = useSelector((state) => state.ticTacToe.context)
  const currentUserObj = useSelector((state) => state.user)
  const otherUserObj = useSelector((state) => state.otherUser)


  const initPlayers = () => {
    let players;

    if(gameContext === localMultiplayerContext){
      players = {
          player1: {
            id : "player1",
            name : "Player 1",
            score : 0, 
            letter : "x"
          },
          player2: {
            id : "player2",
            name : "Player 2",
            score : 0, 
            letter : "o"
          }
      }
    }
    else if(gameContext === OnlineMultiplayerContext){
      players = {
        player1: {
          id : "player1",
          name : currentUserObj.userName,
          score : 0, 
          letter : "x"
        },
        player2: {
          id : "player2",
          name : otherUserObj.name,
          score : 0, 
          letter : "o"
        }
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
       <OnlineMultiplayerTicTacToeBoard players={players} setPlayers={setPlayers} />
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