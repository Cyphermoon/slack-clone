import React, { useReducer } from 'react'
import { initPlayers, playersReducer } from '../../lib/gameUtil.lib'
import ScoreBoard from './ScoreBoard'
import { StyledContextArea } from './styles/game.style'
import TicTacToeMultiplayerBoard from './TicTacToeMultiplayerBoard'

const LocalMultiplayerContainer = () => {
    const [players, setPlayers] = useReducer(playersReducer, null, initPlayers)

    return (
        <StyledContextArea>
            <ScoreBoard players={players} />
            <TicTacToeMultiplayerBoard players={players} setPlayers={setPlayers} />
        </StyledContextArea>
    )
}

export default LocalMultiplayerContainer