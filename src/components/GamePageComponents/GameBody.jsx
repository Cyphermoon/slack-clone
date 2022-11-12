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
  --header-height:42px;
  height:calc(100% - var(--header-height));
  display:flex;
  flex-direction:column;
  justify-content:center;
`

export default GameBody