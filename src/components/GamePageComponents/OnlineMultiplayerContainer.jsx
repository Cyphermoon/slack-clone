import React from 'react'
import styled from 'styled-components'
import OnlineMultiplayerTicTacToeBoard from './OnlineMultiplayerTicTacToeBoard'
import ScoreBoard from './ScoreBoard'

const OnlineMultiplayerContainer = () => {
  

  return (
    <StyledContextArea>
         {/* <ScoreBoard players={players} />
         <OnlineMultiplayerTicTacToeBoard players={players} setPlayers={setPlayers} /> */}
    </StyledContextArea>
  )
}

export const StyledContextArea = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
`

export default OnlineMultiplayerContainer