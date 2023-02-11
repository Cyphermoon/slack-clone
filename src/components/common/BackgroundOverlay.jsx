import React from 'react'
import styled from 'styled-components'

const BackgroundOverlay = ({ children }) => {
    return (
        <StyledOverLay>
            {children}
        </StyledOverLay>
    )
}

const StyledOverLay = styled.div`
    position:absolute;
    content:"";
    top:0;
    left:0;
    right:0;
    bottom:0;
    width:100vw;
    height:100vh;
    z-index:101;
    background-color:rgba(0,0,0,.45);
    backdrop-filter:blur(40px);
    display:flex;
    align-items:center;
    justify-content:center;
`

export default BackgroundOverlay