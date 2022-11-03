import React from 'react'
import styled from 'styled-components'

const ScoreBoard = ({ players }) => {
    return (
        <StyledBoardSection>
            {Object.keys(players).map((key, idx) => {
                if (players.hasOwnProperty(key)) {

                    return (
                        <StyledUserScore key={idx}>
                            <h3>{players[key].name}</h3>
                            <span>{players[key].score}</span>
                        </StyledUserScore>
                    )
                }

                return null
            })}

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