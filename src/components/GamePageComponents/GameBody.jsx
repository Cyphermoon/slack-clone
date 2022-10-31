import React from 'react'
import styled from 'styled-components'
import GameBoard from './GameBoard'
import ScoreBoard from './ScoreBoard'

const GameBody = () => {
  return (
    <StyledMain>
        <ScoreBoard />
        <GameBoard />
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