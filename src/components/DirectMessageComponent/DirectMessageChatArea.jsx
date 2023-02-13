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

    return (
        <StyledChatArea>
            <DirectMessageChatHeader roomName={roomName} />

            <StyledChatMessages isDirectMessage={true}>
                {messagesLoading ? <MessageSkeletons /> :

                    roomMessages?.docs?.map((doc) => {
                        const { serverTimeStamp, content, user, userImg } = doc.data();
                        const id = doc.id;

                        return (
                            <DirectChatMessageItem
                                message={content}
                                timeStamp={serverTimeStamp?.toDate().toDateString()}
                                userName={user}
                                key={id}
                                userImg={userImg} />
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