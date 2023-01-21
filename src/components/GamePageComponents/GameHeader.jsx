import { ArrowDropDown, ChevronLeft } from '@mui/icons-material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AIMultiplayerContext, localMultiplayerContext, OnlineMultiplayerContext } from '../../constants/GameConstant.constant'
import { ticTacToeActions } from '../../store/tic_tac_toe'
import { StyledFinishBtn, StyledGameModes, StyledHeader, StyledNav } from './styles/gameHeader.style'

const GameHeader = () => {
    const gameContext = useSelector((state) => state.ticTacToe.context)
    const isGameContextOnline = gameContext === OnlineMultiplayerContext
    const [isListOpen, setIsListOpen] = useState()
    const dispatch = useDispatch()

    const changeContextMode = (mode) => {
        dispatch(ticTacToeActions.updateContext({ contextState: mode }))
    }

    const handleFinishGameClicked = () => {
        dispatch(ticTacToeActions.updateFinishGameClicked({ isClicked: true }))
    }

    const openDropDownList = (e) => {
        //set the variable that controls the list visibility
        setIsListOpen(true)
    }

    const closeDropDownList = (e) => {
        //set the variable that controls the list visibility
        setIsListOpen(false)
    }

    return (
        <StyledHeader>
            <StyledNav>
                <ul>
                    <li className='return_to_chat'>
                        <ChevronLeft />
                        <Link to={"/"}>return to chat</Link>
                    </li>
                    {isGameContextOnline &&
                        <li><StyledFinishBtn onClick={handleFinishGameClicked}>Finish Game</StyledFinishBtn></li>}

                    {!isGameContextOnline &&
                        <StyledGameModes onMouseEnter={openDropDownList} onMouseLeave={closeDropDownList}>
                            <button ><span>{gameContext}</span> <ArrowDropDown /> </button>
                            <ul className={isListOpen ? "show" : undefined}>
                                <li onClick={() => changeContextMode(AIMultiplayerContext)}>AI mode</li>
                                <li onClick={() => changeContextMode(localMultiplayerContext)}>Local mode</li>
                            </ul>
                        </StyledGameModes>}
                </ul>
            </StyledNav>
        </StyledHeader>
    )
}



export default GameHeader