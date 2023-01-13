import React from 'react'
import GameModeInfo from './GameModeInfo'
import { StyledBoardSection, StyledUserScore } from './styles/scoreBoard.style'

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


export default ScoreBoard