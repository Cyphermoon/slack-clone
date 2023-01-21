import React, { useEffect, useReducer } from 'react'
import ScoreBoard from './ScoreBoard'
import { initPlayers, playersReducer } from '../../lib/gameUtil.lib'
import { auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import AIMultiplayerTicTacToeBoard from './AIMultiplayerTicTacToeBoard'
import { StyledContextArea } from './styles/game.style'

const AIMultiplayerContainer = () => {
    const [currentUserName, isUserLoading] = useAuthState(auth)
    const [players, setPlayers] = useReducer(playersReducer, null, initPlayers)


    useEffect(() => {
        if (isUserLoading) return

        const _players = {
            player1: {
                id: "player1",
                name: currentUserName.displayName,
                score: 0,
                letter: "x"
            },
            player2: {
                id: "player2",
                name: "Cypher Lit",
                score: 0,
                letter: "o"
            }
        }

        setPlayers({ type: "serverUpdate", newPlayers: _players })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUserLoading])



    return (
        <StyledContextArea>
            <ScoreBoard players={players} />
            <AIMultiplayerTicTacToeBoard players={players} setPlayers={setPlayers} />
        </StyledContextArea>
    )

}

export default AIMultiplayerContainer