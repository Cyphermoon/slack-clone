import { GamepadOutlined, StarOutlineOutlined } from '@mui/icons-material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { OnlineMultiplayerContext } from '../../constants/GameConstant.constant'
import { ticTacToeActions } from '../../store/tic_tac_toe'

const DirectMessageChatHeader = ({roomName}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const moveToOnlineGame = () => {
        dispatch(ticTacToeActions.updateContext({contextState: OnlineMultiplayerContext}))
        return navigate("/game")
    }

  return (
    <StyledChatHeader>
    <h3> {roomName}  <StarOutlineOutlined /></h3>
    <button onClick={moveToOnlineGame} className='room_details'><GamepadOutlined /> <span>Play Game</span> </button>
    </StyledChatHeader>
  )
}

const StyledChatHeader = styled.div`
    padding:.7em .9em;
    display:flex;
    align-items:center;
    justify-content:space-between;
    background-color:#f9f9f9;
    border-bottom:1px solid #ccc;

    h3{
        font-size:1.3rem;
        display:flex;
        text-transform:capitalize;
        align-items:baseline;

        svg{
            font-size:1.3rem;
            width:1em;
            height:1em;
        }
    }

    button.room_details{
        display:flex;
        align-items:center;
        background-color:#eaeaea;
        outline: none;
        border:none;
        border-radius:15px;
        padding: .5em;
        cursor:pointer;
        font-size:.99rem;

        span{
            margin-left:.5em;
        }
    }
`

export default DirectMessageChatHeader