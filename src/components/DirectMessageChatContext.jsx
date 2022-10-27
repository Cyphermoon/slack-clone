import React from 'react'
import { collection, doc, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { useSelector } from 'react-redux'
import { db } from '../firebase'
import ChatArea from './ChatArea'

const DirectMessageChatContext = () => {
    const workSpaceActiveId = useSelector((state) => state.workspace.activeId)
    const chatId = useSelector(state => state.chatContext.chatId)
    
  
    const [roomDetails, roomDetailsLoading] = useDocument(
      doc(db, "chats", chatId)
      )
      
    const [roomMessages, messagesLoading] = useCollection(
      query(collection(db, "chats", chatId, "messages"), orderBy("serverTimeStamp", "asc"))
    );
  
    const sendMessage = async (e, input, user) => {
        e.preventDefault();
  
        if (!chatId) return false
  
        const messagesCollectionRef = collection(db, "chats", chatId, "messages")
  
        await setDoc(doc(messagesCollectionRef), {
            content: input,
            serverTimeStamp: serverTimestamp(),
            user: user.displayName,
            userImg: user.photoURL
        })
    }
  
  
  
    return (
      <ChatArea
      roomDetails={roomDetails}
      roomMessages={roomMessages}
      messagesLoading={messagesLoading}
      roomDetailsLoading={roomDetailsLoading}
      sendMessage={sendMessage} />
    )  
}

export default DirectMessageChatContext