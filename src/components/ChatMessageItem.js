import { Avatar } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const ChatMessageItem = () => {
    return (
        <StyledMessageItem>
            <div className='message_group'>
                <Avatar />
                <div>
                     <h4>cypher moon</h4>
                <p>
                    Lorem ipsum dolor sit 
                </p>
                </div>
               
            </div>
         
            <span className='timeStamp'>10:50:am</span>
        </StyledMessageItem>
    )
}

const StyledMessageItem = styled.div`
    display:flex;
    align-items:flex-start;
    justify-content:space-between;
    width:80%;
    max-width:300px;

    h4{
        font-weight:600;
        opacity:.89;
        margin-bottom:.25em;
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