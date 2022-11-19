import React from 'react'
import styled from 'styled-components'
import GameModeInfo from './GameModeInfo'

const ScoreBoard = ({ players }) => {
    return (
        <StyledBoardSection>
            {Object.keys(players).map((key, idx) => {
                return (
                    <StyledUserScore key={idx}>
                        <h3>{players[key].name}</h3>
                        <span>{players[key].score}</span>
                    </StyledUserScore>
                )
            })}
            <GameModeInfo />
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
    display:grid;
    grid-template-columns:repeat(2, 1fr);
`

const StyledUserScore = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;

    h3{
        font-size:1rem;
        font-weight:400;
        margin-bottom:3em;
        text-transform: capitalize;
        word-wrap: break-word;
    }

    span{
        font-size:5rem;
        font-weight:400;
        color:#444;
    }
`
export default ScoreBoard