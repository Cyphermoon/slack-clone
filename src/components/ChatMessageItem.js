import { Avatar } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const ChatMessageItem = ({ userImg, userName, message, timeStamp }) => {
    return (
        <StyledMessageItem>
            <div className='message_group'>
                <Avatar src={userImg || ""} />
                <div>
                    <h4>{userName}</h4>
                    <p>
                        {message}
                    </p>
                </div>

            </div>

            <span className='timeStamp'>{timeStamp}</span>
        </StyledMessageItem>
    )
}

const StyledMessageItem = styled.div`
    display:flex;
    align-items:flex-start;
    justify-content:space-between;
    width:80%;
    max-width:500px;

    h4{
        font-weight:600;
        opacity:.89;
        margin-bottom:.25em;
        text-transform:capitalize;
    }

    .MuiAvatar-root{

        svg{   font-size:8rem;}
     
        margin-right:.45em;
    }

    .message_group{
        display:flex;

        p{
            font-size:.97rem;
        }
    }

    span{
        color:#555;
        font-size:.76rem;
        font-weight:300;
    }
`


export default ChatMessageItem