import React from 'react'
import styled from 'styled-components'

const ChatInput = () => {


    return (
        <StyledChatInput >
            <input type="text" placeholder='Say something' />
            <button type='submit' hidden>send</button>
        </StyledChatInput>
    )
}

const StyledChatInput = styled.form`
    position:absolute;
    width:80%;
    max-width:450px;
    border:1px solid #ccc;
    background-color:#f1f1f1;
    border-radius:2px;
    bottom:50px;
    left:50%;
    transform: translateX(-50%);

    input{
        width:100%;
        background-color:transparent;
        color:black;
        border:1px solid #333;
        padding:1em .5em;
        font-size:1rem;
    }
`

export default ChatInput