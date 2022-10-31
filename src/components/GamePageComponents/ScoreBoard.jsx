import React from 'react'
import styled from 'styled-components'

const ScoreBoard = () => {
  return (
    <StyledBoardSection>
        <StyledUserScore>
            <h3>Seun</h3>
            <span>1</span>
        </StyledUserScore>
        <StyledUserScore>
            <h3>Cypher Moon</h3>
            <span>10</span>
        </StyledUserScore>
    </StyledBoardSection>
  )
}

const StyledBoardSection = styled.section`
    margin-right:12em;
    background-color:#f4f4f4;
    width:100%;
    max-width:310px;
    height:290px;
    border-radius:20px;
    padding:1em 1.5em;
    display:flex;
    justify-content:space-between;
`

const StyledUserScore = styled.div`
    display:flex;
    flex-direction:column;
    // justify-content:center;
    align-items:center;

    h3{
        font-size:1.2rem;
        font-weight:400;
        margin-bottom:3em;
    }

    span{
        font-size:5rem;
        font-weight:400;
        color:#444;
    }
`

export default ScoreBoard