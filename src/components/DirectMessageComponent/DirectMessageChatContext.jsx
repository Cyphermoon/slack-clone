import React from 'react'
import { collection, doc, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useSelector } from 'react-redux'
import DirectMessageChatArea from './DirectMessageChatArea'
import { db } from '../../firebase'
import { isValidInputString } from '../../lib/util.lib'

const DirectMessageChatContext = () => {
  const chatId = useSelector(state => state.chatContext.chatId)

  const roomName = useSelector(state => state.otherUser.name)

  const [roomMessages, messagesLoading] = useCollection(
    query(collection(db, "chats", chatId, "messages"), orderBy("serverTimeStamp", "asc"))
  );

  const sendMessage = async (e, input, user) => {
    e.preventDefault();

    if (!chatId) return false
    if (!isValidInputString(input)) return false


    const messagesCollectionRef = collection(db, "chats", chatId, "messages")

    await setDoc(doc(messagesCollectionRef), {
      content: input,
      serverTimeStamp: serverTimestamp(),
      user: user.displayName,
      userImg: user.photoURL
    })
  }



  return (
    <DirectMessageChatArea
      roomName={roomName}
      roomMessages={roomMessages}
      messagesLoading={messagesLoading}
      sendMessage={sendMessage} />
  )
}

export default DirectMessageChatContext