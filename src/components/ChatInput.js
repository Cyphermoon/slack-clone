import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from '../firebase';
import { useSelector } from 'react-redux';

const ChatInput = ({ chatRef, channelName, sendMessage }) => {
    const chatContext = useSelector(state => state.chatContext.context)
    const [user] = useAuthState(auth)
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        sendMessage(e, input, user);
        clearMessage()
    }

    const clearMessage = () => {
        chatRef.current.scrollIntoView({ behavior: "smooth" })
        setInput("")
    }

    return (
        <StyledChatInput onSubmit={handleSubmit} >
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder={`message ${channelName || ""} ${chatContext === "directMessage" ? "in a private chat" : "room"}`} />

            <button type='submit' hidden>send</button>
        </StyledChatInput>
    )
}

const StyledChatInput = styled.form`
    width:100%;
    margin:0 auto;
    background-color:#f1f1f1;
    position: absolute;
    bottom:0;

    @media screen and (max-width: ${({ theme }) => theme.breakpoint.sm}){
        position:fixed;
      }

    &:focus-within{
        border:1px solid #000;
    }

    input{
        width:100%;
        background-color:transparent;
        color:black;
        border:none;
        border-top:1px solid #ccc;
        padding:1.5em;
        height:77px;
        font-size:1rem;
        outline:none;
    }
`

export default ChatInput