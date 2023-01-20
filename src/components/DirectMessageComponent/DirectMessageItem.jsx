import { Avatar } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const DirectMessageItem = ({ name, photoUrl, chatId, handleClick, otherUserId }) => {
    return (
        <StyledDirectMessageItem onClick={() => handleClick(chatId, "directMessage", name, otherUserId)}>
            <StyledAvatar
                alt={`${name} profile`}
                src={photoUrl}
                sx={{ width: 32, height: 32 }}
                variant={"rounded"} />
            <span className='user_name' data-close-nav>{name}</span>
        </StyledDirectMessageItem>
    )
}

const StyledAvatar = styled(Avatar)`
    
`

const StyledDirectMessageItem = styled.div`
    display:flex;
    align-items:center;
    color:white;

    &:hover{
        opacity:.8;
        cursor:pointer;
    }
    
    & > * + *{
        margin-left:.5em;
    }

    .user_name{
        font-size:.99rem;
        font-weight:300;
        text-transform:capitalize;
    }

`

export default DirectMessageItem