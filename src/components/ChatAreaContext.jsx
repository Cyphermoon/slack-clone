import { collection, doc, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import React from 'react'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { useSelector } from 'react-redux'
import { db } from '../firebase'
import ChatArea from './ChatArea'

const ChatAreaContext = () => {
  const workSpaceActiveId = useSelector((state) => state.workspace.activeId)
  const roomId = useSelector(state => state.room.roomId)

  const [roomDetails, roomDetailsLoading] = useDocument(
    doc(db, "workspace", workSpaceActiveId, "rooms", roomId)
    )
    
  const [roomMessages, messagesLoading] = useCollection(
    query(collection(db, "workspace", workSpaceActiveId, "rooms", roomId, "messages"), orderBy("serverTimeStamp", "asc"))
  );

  const sendMessage = async (e, input, user) => {
      e.preventDefault();

      if (!roomId) return false

      const messagesCollectionRef = collection(db, "workspace", workSpaceActiveId, "rooms", roomId, "messages")

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
    roomDetailsLoading={roomDetailsLoading}
    roomMessages={roomMessages}
    messagesLoading={messagesLoading}
    sendMessage={sendMessage} />
  )
}

export default ChatAreaContext