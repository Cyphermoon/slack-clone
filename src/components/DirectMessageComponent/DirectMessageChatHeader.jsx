import { GamepadOutlined } from '@mui/icons-material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc, setDoc } from "firebase/firestore"

import styled from 'styled-components'
import { OnlineMultiplayerContext } from '../../constants/GameConstant.constant'
import { ticTacToeActions } from '../../store/tic_tac_toe'
import { initBoard } from '../../lib/gameUtil.lib'
import { db } from '../../firebase'

const DirectMessageChatHeader = ({ roomName }) => {
    const chatId = useSelector(state => state.chatContext.chatId)
    const currentUserObj = useSelector(state => state.user)
    const otherUserObj = useSelector(state => state.otherUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getGameId = async (id) => {
        let gameDoc = await getDoc(doc(db, "ticTacToeGames", id))

        return gameDoc.exists() ? true : false
    }

    const createTicTacToeGame = async (id) => {
        let gameDoc = doc(db, "ticTacToeGames", id)

        let player1 = {
            id: "player1",
            letter: "x",
            name: currentUserObj.userName,
            score: 0,
            userId: currentUserObj.userId
        }

        let player2 = {
            id: "player2",
            letter: "o",
            name: otherUserObj.name,
            score: 0,
            userId: otherUserObj.id
        }

        const gameData = {
            gameBoard: initBoard(),
            boardOpened: true,
            winner: "",
            isDraw: false,
            currentPlayer: player1,

            players: {
                player1,
                player2
            }
        }

        await setDoc(gameDoc, gameData)

    }

    const moveToOnlineGame = async () => {
        const generatedId = chatId.replaceAll("@gmail.com", "").concat("_game")

        dispatch(ticTacToeActions.updateGameId({ id: generatedId }))

        dispatch(ticTacToeActions.updateContext({ contextState: OnlineMultiplayerContext }))

        getGameId(generatedId)
            .then((gameExists) => {
                if (!gameExists) {
                    createTicTacToeGame(generatedId)
                }
            })


        return navigate("/game")
    }

    return (
        <StyledChatHeader>
            <h3> {roomName} </h3>
            <button onClick={moveToOnlineGame} className='room_details'><GamepadOutlined /> <span>Play Game</span>
            </button>
        </StyledChatHeader>
    )
}

const StyledChatHeader = styled.div`
    padding:.7em .5em;
    display:flex;
    align-items:center;
    justify-content:space-between;
    background-color:#f9f9f9;
    border-bottom:1px solid #ccc;
    position:absolute;
    width:100%;
    z-index:1;

    @media screen and (max-width: ${({ theme }) => theme.breakpoint.sm}){
      position:fixed;
    }

    h3{
        font-size:1.3rem;
        text-transform:capitalize;
        text-align:left;
        word-wrap:break-word;
        word-break:break-all:
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
            margin-left:.8em;
            white-space:nowrap;
        }
    }
`

export default DirectMessageChatHeader