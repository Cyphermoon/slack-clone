import React from 'react'
import styled from 'styled-components'
import GameBody from '../components/GamePageComponents/GameBody'
import GameHeader from '../components/GamePageComponents/GameHeader'

const GamePage = () => {
  return (
    <StyledGamePage>
      <GameHeader />
      <GameBody />
    </StyledGamePage>

  )
}

const StyledGamePage = styled.div`
  min-height:100vh;
  display:flex;
  flex-direction:column;

`

export default GamePage