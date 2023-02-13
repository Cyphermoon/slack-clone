import { Avatar } from '@mui/material'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import { auth } from '../../firebase'

const DirectChatMessageItem = ({ userImg, userName, message, timeStamp }) => {
    const [user] = useAuthState(auth)
    return (
        <StyledMessageItem
            isCurrentUserMessage={user.displayName === userName}>

            <Avatar src={userImg || ""} alt={userName} referrerPolicy="no-referrer" />
            <StyledMessageInfo
                isCurrentUserMessage={user.displayName === userName}>
                <div className='user_name'>
                    <h4>{userName}</h4>
                    <p>
                        {message}
                    </p>
                </div>

                <span className='timeStamp'>{timeStamp}</span>
            </StyledMessageInfo>

        </StyledMessageItem>
    )
}

const StyledMessageItem = styled.div`
    margin-left:${({ isCurrentUserMessage }) => (isCurrentUserMessage ? "auto" : null)};
    display:flex;
    // flex-direction:${({ isCurrentUserMessage }) => (isCurrentUserMessage ? "row-reverse" : "row")};
    align-items:center;
    justify-content:space-between;
    width:100%;
    max-width: 360px;

    @media screen and (max-width: ${({ theme }) => theme.breakpoint.sm}){
        margin-left:0;
    }


    .MuiAvatar-root{
        svg{  font-size:6.8rem;}

    }
`

const StyledMessageInfo = styled.div`
    width:85%;
    display:flex;
    // flex-direction:${({ isCurrentUserMessage }) => (isCurrentUserMessage ? "row-reverse" : "row")};
    justify-content:space-between;

    .user_name{
        display:flex;
        flex-direction:column;
        align-items:start;
        width:70%;

        h4{
            font-size:.9rem;
            font-weight:700;
            opacity:.89;
            text-transform:capitalize;
            margin-bottom:.1em;
        }

        p{
            font-size:.89rem;
            width:100%;
        }
    }

    span{
        color:#555;
        font-size:.72rem;
        font-weight:300;
        align-self:start;
        flex-grow:1;
    }

  
`
export default DirectChatMessageItem