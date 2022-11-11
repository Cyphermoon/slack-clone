import { GamepadOutlined, StarOutlineOutlined } from '@mui/icons-material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc, setDoc } from "firebase/firestore"

import styled from 'styled-components'
import { OnlineMultiplayerContext } from '../../constants/GameConstant.constant'
import { ticTacToeActions } from '../../store/tic_tac_toe'
import { initBoard } from '../../lib/gameUtil.lib'
import { db } from '../../firebase'

const DirectMessageChatHeader = ({roomName}) => {
    const chatId = useSelector(state => state.chatContext.chatId)
    const currentUserName = useSelector(state => state.user.userName)
    const otherUserName = useSelector(state => state.otherUser.name)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getGameId = async (id) => {
        let gameDoc = await getDoc(doc(db, "ticTacToeGames", id))
    
        return gameDoc.exists() ? true : false
    }

    const createTicTacToeGame = async (id) => {
        let gameDoc = doc(db, "ticTacToeGames", id)

        let player1 = {
            id : "player1",
            letter: "x",
            name : currentUserName,
            score : 0
        }
        
        let player2 = {
            id : "player2",
            letter: "o",
            name : otherUserName,
            score : 0
        }

        const gameData = {
                gameBoard: initBoard(),
                boardOpened: true,
                winner: "",
                isDraw: false,
                currentPlayer: player1,

                players:{
                    player1,
                    player2
                }
        }
        
        await setDoc(gameDoc, gameData)
            
    }

    const moveToOnlineGame = async () => {
        const generatedId = chatId.replaceAll("@gmail.com", "").concat("_game") 

        dispatch(ticTacToeActions.updateGameId({id: generatedId}))
        
        dispatch(ticTacToeActions.updateContext({contextState: OnlineMultiplayerContext}))      

        getGameId(generatedId)
        .then((gameExists) => {
            if(!gameExists){
                createTicTacToeGame(generatedId)
            }            
        })
        

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