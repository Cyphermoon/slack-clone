import React, { useState } from 'react'
import styled from 'styled-components'
import DirectMessageItem from './DirectMessageItem'

const DirectMessageList = () => {
  const [directMessages, setDirectMessages] = useState([
    { 
      photoUrl: "https://via.placeholder.com/150",
     name: "adam", 
     chatId: "3019"
    }
  ])

  return (
    <StyledDirectMessages>
      <h4>Direct Messages</h4>
      {directMessages.map((directMessage, idx) => {
        return(
           <DirectMessageItem
           key={idx}
           name={directMessage.name}
           photoUrl={directMessage.photoUrl}
           chatId={directMessage.chatId} />
        )

      })}
    </StyledDirectMessages>
  )
}

const StyledDirectMessages = styled.div`
    & > h4 {
        color:white;
        font-size:1.08rem;
        font-weight:400;
        text-transform: capitalize;
        margin-bottom: .86em;
    }
`

export default DirectMessageList