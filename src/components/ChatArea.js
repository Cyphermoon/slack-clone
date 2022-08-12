import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import ChatMessageItem from './ChatMessageItem'
import { useCollection, useDocument } from "react-firebase-hooks/firestore"
import { collection, doc, orderBy, query } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { db } from '../firebase'

const ChatArea = () => {
    const chatRef = useRef();
    const roomId = useSelector(state => state.room.roomId)
    const workSpaceId = useSelector((state) => state.workspace.activeId)

    const [roomDetails, loading] = useDocument(doc(db, "workspace", workSpaceId, "rooms", roomId))

    const [roomMessages, messagesLoading] = useCollection(
        query(collection(db, "workspace", workSpaceId, "rooms", roomId, "messages"), orderBy("serverTimeStamp", "asc")));


    useEffect(() => {
        chatRef.current.scrollIntoView({ behavior: "smooth" })
    })


    return (
        <StyledChatArea>
            <ChatHeader roomName={!loading && roomDetails?.data()?.name} />
            <StyledChatMessages>
                {messagesLoading && <h4>I am fetching messages</h4>}

                {!messagesLoading &&
                    roomMessages.docs.map((doc) => {
                        const { serverTimeStamp, content, user, userImg } = doc.data();
                        const id = doc.id;

                        return <ChatMessageItem
                            key={id}
                            message={content}
                            timeStamp={serverTimeStamp?.toDate().toDateString()}
                            userName={user}
                            userImg={userImg} />
                    })}
                <div className='message_bottom' ref={chatRef} />
            </StyledChatMessages>
            <ChatInput chatRef={chatRef} channelName={roomDetails?.data()?.name} />
        </StyledChatArea>
    )
}

const StyledChatArea = styled.div`   
    position:relative;
    padding-top:80px;
    flex-grow:1;
    height:100%;
    overflow:auto;
`

const StyledChatMessages = styled.div`
    width:100%;
    padding:.7em 1em; 
    
    & > * + *{
        margin-top:3.5em;
    }

    .message_bottom{
        padding-top:5rem;
    }
`

export default ChatArea