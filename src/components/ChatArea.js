import React from 'react'
import styled from 'styled-components'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import ChatMessageItem from './ChatMessageItem'
import { useCollection, useDocument } from "react-firebase-hooks/firestore"
import { collection, doc, Timestamp } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { db } from '../firebase'

const ChatArea = () => {
    const roomId = useSelector(state => state.room.roomId)
    const [roomDetails, loading] = useDocument(doc(db, "rooms", roomId))
    const [roomMessages, messagesLoading] = useCollection(collection(db, "rooms", roomId, "messages"))


    return (
        <StyledChatArea>
            <ChatHeader roomName={!loading && roomDetails?.data().name} />
            <StyledChatMessages>
                {messagesLoading && <h4>I am fetching messages</h4>}

                {!messagesLoading &&
                    roomMessages.docs.map((doc) => {
                        const { serverTimeStamp, content, user, id } = doc.data();
                        console.log("document data", doc.data());
                        return <ChatMessageItem
                            key={id}
                            message={content}
                            timeStamp={serverTimeStamp?.toDate().toDateString()}
                            userName={user} />
                    })}
            </StyledChatMessages>
            <ChatInput />
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
`

export default ChatArea