import React from 'react'
import styled from 'styled-components'

const DisplayModal = ({message}) => {
  return (
    <StyledDisplayModal>
        <h3>{message}</h3>
    </StyledDisplayModal>
  )
}

const StyledDisplayModal = styled.div`
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
    border-left: 7px red solid;
    padding:2.5em 2em;

    h3{
        font-size:1.1rem;
        font-weight:600;
        color:#333;
    }
`

export default DisplayModal