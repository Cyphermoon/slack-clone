import React from 'react'
import styled from 'styled-components'

const GameBoard = () => {
  return (
    <StyledBoardSection>
        <span className='current_user'>Your Turn</span>
        <StyledTicTacToeBoard>
          <StyledCell />
          <StyledCell />
          <StyledCell />
          <StyledCell />
          <StyledCell />
          <StyledCell />
          <StyledCell />
          <StyledCell />
          <StyledCell />
        </StyledTicTacToeBoard>
        <span className='restart_game'>Restart Game</span>
    </StyledBoardSection>
  )
}

const StyledBoardSection = styled.section`
    --board-color:#f4f4f4;
    width:100%;
    text-align:center;
    max-width:400px;
    background-color:red;
    border-radius:20px;
    padding:1em .5em;

    & > * + *{
      margin-top:2em;
    }

    .current_user,
    .restart_game{
        display:block;
        color:var(--board-color);
        font-weight:500;
        font-size:.88rem;
    }
`

const StyledTicTacToeBoard = styled.div`
    --cell-size: 80px;
    display:grid;
    grid-template-columns: repeat(3, var(--cell-size));
    grid-auto-rows:var(--cell-size);
    // place-items:center;
    place-content:center;
`

const StyledCell = styled.div`
    /*clearing top border*/
    :nth-child(1),
    :nth-child(2),
    :nth-child(3){
      border-top:none;
    }

    /*clearing left border*/
    :nth-child(3n){
      border-right:none;
    }

    /*clearing bottom border*/
    :nth-child(7),
    :nth-child(8),
    :nth-child(9){
      border-bottom:none;
    }

    /*clearing left border*/
    :nth-child(3n - 2){
      border-left:none;
    }

    width:auto;
    border:2px solid var(--board-color);
    margin:0;

`

export default GameBoard