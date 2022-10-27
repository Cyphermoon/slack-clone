import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';
import ChatInput from '../ChatInput';
import MessageSkeletons from '../loaders/MessageSkeletons';

import DirectChatMessageItem from './DirectChatMessageItem';
import DirectMessageChatHeader from './DirectMessageChatHeader';


const DirectMessageChatArea = ({ roomName, roomMessages, messagesLoading, sendMessage }) => {

    const chatRef = useRef();

    useEffect(() => {
        chatRef.current.scrollIntoView({ behavior: "smooth" })
    })

return(
<StyledChatArea>
  <DirectMessageChatHeader roomName={roomName} />

  <StyledChatMessages>
      {messagesLoading ? <MessageSkeletons /> :

          roomMessages?.docs?.map((doc) => {
              const { serverTimeStamp, content, user, userImg } = doc.data();
              const id = doc.id;

              return (
                  <div
                  key={id}>
                      <DirectChatMessageItem
                          message={content}
                          timeStamp={serverTimeStamp?.toDate().toDateString()}
                          userName={user}
                          userImg={userImg} />

                  </div>

              )

          })
      }
      <div className='message_bottom' ref={chatRef} />
  </StyledChatMessages>

  <ChatInput chatRef={chatRef} sendMessage={sendMessage} channelName={roomName} />
</StyledChatArea>
)
}

const StyledChatArea = styled.div`   
    position:relative;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    padding-top:${({ theme }) => theme.spacing_top_from_header};
    flex-grow:1;
    height:100%;
    overflow:auto;
`

const StyledChatMessages = styled.div`
    width:100%;
    padding:.7em 1.2em; 
    overflow-y:scroll;
    justify-self:start;
    flex-grow:1;
    
    & > * + *{
        margin-top:3.5em;
    }

    .message_bottom{
        padding-bottom:3rem;
    }

    div{
        // display:flex;
        // flex-direction:column;
        // justify-content:center;
        // background-color:red;
    }
`

export default DirectMessageChatArea