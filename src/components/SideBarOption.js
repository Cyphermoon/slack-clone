import React from 'react'
import styled from 'styled-components'

const SideBarOption = ({ icon, title }) => {
    return (
        <StyledSideBarOption>
            {icon && icon}
            <button>{title}</button>
        </StyledSideBarOption>
    )
}

const StyledSideBarOption = styled.div`
    --label-size:.89rem;

    display:flex;
    align-items:center;
    justify-content:flex-start;

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
        font-size:var(--label-size);
        color:white;
        font-weight:400;
        justify-self:flex-end;
    }
`

export default SideBarOption