import React from 'react'
import styled from 'styled-components'

const GameInfo = () => {
  return (
    <StyledGameInfo>
          <h3>Your are playing against an AI(cypher lit)</h3>
    </StyledGameInfo>
  )
}

const StyledGameInfo = styled.div`
    h3{
        text-align:center;
    }
`

export default GameInfo