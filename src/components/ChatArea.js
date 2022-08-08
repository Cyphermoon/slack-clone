import React from 'react'
import styled from 'styled-components'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import ChatMessageItem from './ChatMessageItem'

const ChatArea = () => {
    return (
        <StyledChatArea>
            <ChatHeader />
            <StyledChatMessages>
                <ChatMessageItem />
                <ChatMessageItem />
                <ChatMessageItem />
            </StyledChatMessages>
            <ChatInput />
        </StyledChatArea>
    )
}

const StyledChatArea = styled.div`   
    position:relative;
    padding-top:80px;
    flex-grow:1;
    height:100%;
`

const StyledChatMessages = styled.div`
    width:100%;
    padding:.7em 1em; 
    
    & > * + *{
        margin-top:3.5em;
    }
`

export default ChatArea