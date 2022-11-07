import React, { useEffect, useRef } from 'react'
import { StyledChatArea, StyledChatMessages } from '../ChatArea';
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


export default DirectMessageChatArea