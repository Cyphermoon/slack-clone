import { Tag } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'

const SideBarOption = ({ Icon, title, handleClick = f => f, id, disabled, small }) => {
    return (
        <StyledSideBarOption
            onClick={handleClick}
            className={`${disabled && 'disabled'} ${small && 'small'}`}>
            {Icon && <Icon />}
            {Icon ?
                <button data-close-nav >{title}</button> :
                <button onClick={() => handleClick(id)}><Tag /> {title}</button>}

        </StyledSideBarOption>
    )
}

const StyledSideBarOption = styled.div`
    --label-size:.89rem;
   --color: #eee;

    display:flex;
    align-items:center;
    justify-content:flex-start;

    &.disabled{
        opacity:.7;
        pointer-events:none;
    }

    &.small{
        button{
            font-size:.88rem;
        }

        svg{
            width:1.2em;
            height:1.2em;
        }
    }
    
    &:hover{
        opacity:.78;
        cursor:pointer;
    }

    svg{
        font-size:var(--label-size);
        margin-right:.5em;
        width:1.4em;
        height:1.4em;
        color: var(--color)
    }

    button{
        border:none;
        outline:none;
        background-color:transparent;
        cursor:pointer;
        font-size:var(--label-size);
        font-weight:400;
        display:inline-flex;
        align-items:center;
        color: var(--color)
    }
`

export default SideBarOption