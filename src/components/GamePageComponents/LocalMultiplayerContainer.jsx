import React, { useReducer } from 'react'
import { initPlayers, playersReducer } from '../../lib/gameUtil.lib'
import { StyledContextArea } from './OnlineMultiplayerContainer'
import ScoreBoard from './ScoreBoard'
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