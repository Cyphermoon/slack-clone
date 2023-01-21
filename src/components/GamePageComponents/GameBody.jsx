import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { AIMultiplayerContext, localMultiplayerContext, OnlineMultiplayerContext } from '../../constants/GameConstant.constant'
import AIMultiplayerContainer from './AIMultiplayerContainer'
import LocalMultiplayerContainer from './LocalMultiplayerContainer'
import OnlineMultiplayerContainer from './OnlineMultiplayerContainer'


const GameBody = () => {
  const gameContext = useSelector((state) => state.ticTacToe.context)

  return (
    <StyledMain>
      {gameContext === OnlineMultiplayerContext && <OnlineMultiplayerContainer />}
      {gameContext === localMultiplayerContext && <LocalMultiplayerContainer />}
      {gameContext === AIMultiplayerContext && <AIMultiplayerContainer />}
    </StyledMain>
  )
}

const StyledMain = styled.main`
  flex-grow: 1;
  display:flex;
  flex-direction:column;
  justify-content:center;

  @media screen and (max-width: ${({ theme }) => theme.breakpoint.sm}) {
    &{
      justify-content: flex-start;
      padding-top: 1em;
     }
   }
`

export default GameBody