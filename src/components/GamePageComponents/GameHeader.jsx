import { ArrowDropDown, ChevronLeft } from '@mui/icons-material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { AIMultiplayerContext, localMultiplayerContext, OnlineMultiplayerContext } from '../../constants/GameConstant.constant'
import { ticTacToeActions } from '../../store/tic_tac_toe'

const GameHeader = () => {
    const gameContext = useSelector((state) => state.ticTacToe.context)
    const isGameContextOnline = gameContext === OnlineMultiplayerContext
    const [isListOpen, setIsListOpen] = useState()
    const dispatch = useDispatch()

    const changeContextMode = (mode) => {
        dispatch(ticTacToeActions.updateContext({contextState: mode}))
    }

    const handleFinishGameClicked = () => {
        dispatch(ticTacToeActions.updateFinishGameClicked({isClicked:true}))
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

const StyledHeader = styled.header`
    background-color:var(--slack-color);
    padding:7px 20px;
`

const StyledFinishBtn = styled.button`
    background-color:white;
    border-radius:10px;
    color:black;
    border:none;
    outline:none;
    padding:.5em .35em;
    cursor:pointer
`


const StyledNav = styled.nav`
    width:95%;

    ul{
        width:100%;
        padding:0;
        margin:0;
        list-style:none;
        display:flex;
        align-items:center;
        justify-content:space-between;
    }
    
    li.return_to_chat{
        display:flex;
        cursor:pointer;

        .MuiSvgIcon-root{
            color:white;
            font-size:1.5em
        }

        a{
            color:white;
            text-decoration:underline;
        }
       
    }
`

const StyledGameModes = styled.li`
    border: 2px lightgray solid;
    position:relative;
    padding: .2em .5em;
    border-radius: 10px;
    cursor:pointer;

    button{
        outline:none;
        background-color:transparent;
        color:lightgray;
        font-size:.85rem;
        font-weight:600;
        border:none;
        display:inline-flex;
        align-items:center;
        cursor:pointer;

        :hover{
            opacity:.85;
        }
    }

    ul{
        /*container for the list item, hidden by default*/
        position:absolute;
        display:none;
        background-color:#e2e2e2;
        z-index:10;
        width:max-content;

        &.show{
            display:block;
        }

        li{
            cursor:pointer;
            font-size:.8rem;
            color:#1c1c1c;
            padding:.5em 1em;

            :hover{
                background-color:#c4c4c4;
            }
        }
    }
    
`



export default GameHeader