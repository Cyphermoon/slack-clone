import React from 'react'
import styled from 'styled-components'

const SideBarOption = ({ Icon, title, handleClick = f => f, id, disabled }) => {
    return (
        <StyledSideBarOption className={disabled && 'disabled'}>
            {Icon && <Icon />}
            {Icon ?
                <button data-close-nav onClick={handleClick}>{title}</button> :
                <SideOptionContainer onClick={() => handleClick(id)}># <button data-close-nav>{title}</button></SideOptionContainer>}

        </StyledSideBarOption>
    )
}

const StyledSideBarOption = styled.div`
    --label-size:.89rem;

    display:flex;
    align-items:center;
    justify-content:flex-start;

    &.disabled{
        opacity:.7;
        pointer-events:none;
    }
    
    &:hover{
        opacity:.78;
        cursor:pointer;
    }

    svg{
        font-size:var(--label-size);
        color:white;
        margin-right:.5em;
        width:1.4em;
        height:1.4em;
    }

    button{
        border:none;
        outline:none;
        background-color:transparent;
        cursor:pointer;
        font-size:var(--label-size);
        color:white;
        font-weight:400;
    }
`

const SideOptionContainer = styled.div`
    color:white;
`

export default SideBarOption