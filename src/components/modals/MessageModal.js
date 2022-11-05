import React from 'react'
import styled from 'styled-components'

const MessageModal = ({ message }) => {
    return (
        <StyledMessageModal >
            <h2>{message} </h2>
        </StyledMessageModal>

    )
}

const StyledMessageModal = styled.div`

    h2{
      color:white;
      font-weight:600;
      font-size:1.5rem;
    }
`

export default MessageModal