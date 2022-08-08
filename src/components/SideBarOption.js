import React from 'react'
import styled from 'styled-components'

const SideBarOption = ({ Icon, title, handleClick = f => f }) => {
    return (
        <StyledSideBarOption>
            {Icon && <Icon />}
            {Icon ?
                <button onClick={handleClick}>{title}</button> :
                <SideOptionContainer># <button>{title}</button></SideOptionContainer>}

        </StyledSideBarOption>
    )
}

const StyledSideBarOption = styled.div`
    --label-size:.89rem;

    display:flex;
    align-items:center;
    justify-content:flex-start;
    
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