import { Avatar } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const ChatMessageItem = ({ userImg, userName, message, timeStamp }) => {
    return (
        <StyledMessageItem>
            <Avatar src={userImg || ""} alt={userName} referrerPolicy="no-referrer" />
            <div className="message_info">
                <div className='user_name'>
                    <h4>{userName}</h4>
                    <span className='timeStamp'>{timeStamp}</span>
                </div>

                <p>
                    {message}
                </p>
            </div>

        </StyledMessageItem>
    )
}

const StyledMessageItem = styled.div`
    display:flex;
    align-items:flex-start;
    justify-content:space-between;
    width:100%;
    max-width:350px;


    .MuiAvatar-root{
        svg{   font-size:7rem;}

    }

    .message_info{
        width:85%;

        .user_name{
            display:flex;
            align-items:center;
            margin-bottom:.3em;
            justify-content:space-between;
            width:100%;

            h4{
                font-weight:700;
                opacity:.89;
                text-transform:capitalize;
            }


            span{
                color:#555;
                font-size:.76rem;
                font-weight:300;
            }

        }

        p{
            font-size:.89rem;
            width:100%;
        }
    }
`


export default ChatMessageItem