import React from 'react'
import styled from 'styled-components'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'

const ChatArea = () => {
    return (
        <StyledChatArea>
            <ChatHeader />
            <ChatInput />
        </StyledChatArea>
    )
}

export const StyledChatArea = styled.div`   
    position:relative;
    padding-top:80px;
    flex-grow:1;
    height:100%;
`

export default ChatArea