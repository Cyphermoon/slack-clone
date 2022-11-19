import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { AIMultiplayerContext, localMultiplayerContext, OnlineMultiplayerContext } from '../../constants/GameConstant.constant'

const GameModeInfo = () => {
    const gameContext = useSelector((state) => state.ticTacToe.context)
    const otherUserName = useSelector((state) => state.otherUser.name)
    
  return (
    <>
      {gameContext === AIMultiplayerContext && 
            <StyledModeInfo>You are playing against an AI (Cypher Lit)</StyledModeInfo>}

        {gameContext === localMultiplayerContext &&
            <StyledModeInfo>This is a local multiplayer mode</StyledModeInfo>}

        {gameContext === OnlineMultiplayerContext &&
            <StyledModeInfo>You are playing against {otherUserName} </StyledModeInfo>}
    </>
  )
}

const StyledModeInfo = styled.p`
    font-size:.7rem;
    font-weight:500;
    color:#333333;
    grid-column: 1 / -1;
    justify-self:center;
    
`


export default GameModeInfo