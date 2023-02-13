import { DetailsOutlined, StarOutlineOutlined } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'

const ChatHeader = ({ roomName }) => {
    return (
        <StyledChatHeader>
            <h3> {roomName}  <StarOutlineOutlined /></h3>
            <span className='room_details'><DetailsOutlined /> Details</span>
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
    z-index:1;

    h3{
        font-size:1.3rem;
        display:flex
        align-items:baseline;

        svg{
            font-size:1.3rem;
            width:1em;
            height:1em;
        }
    }

    span.room_details{
        font-size:.99rem;
        display:flex
        align-items:baseline;

        svg{
            font-size:.99rem;
        }
    }
`

export default ChatHeader