import React from 'react'
import styled from 'styled-components'

const Workspace = ({ initials, id, active, handleClick = f => f }) => {
    return (
        <StyledWorkspace active={active} onClick={() => handleClick(id)} >
            <h6>{initials}</h6>
        </StyledWorkspace>

    )
}

const StyledWorkspace = styled.div`
    object-fit:contain;
    aspect-ratio: 1 / 1;
    width:35px;
    border-radius:50%;
    display:block;
    cursor:pointer;
    border-radius:7px;
    padding:.2em;
    border-width:3px;
    border-color: #c8c8c8;
    border-style: ${({ active }) => active && "solid"};
    transition:all 200ms linear;
    background-color:gray;
    display:flex;
    align-items:center;
    justify-content:center;
    text-align:center;

    h6{
        font-size:1.1rem;
        color:white;
        text-transform:uppercase;
    }
    
    :hover{
        border-color: #f8f8f8;
        border-style:solid;
    }
`

export default Workspace