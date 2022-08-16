import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { db } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from '../firebase';

const ChatInput = ({ chatRef, channelName }) => {
    const [user] = useAuthState(auth)
    const [input, setInput] = useState("");
    const roomId = useSelector((state) => state.room.roomId);
    const workSpaceId = useSelector((state) => state.workspace.activeId)

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!roomId) return false

        const messagesCollectionRef = collection(db, "workspace", workSpaceId, "rooms", roomId, "messages")

        const docSnap = await setDoc(doc(messagesCollectionRef), {
            content: input,
            serverTimeStamp: serverTimestamp(),
            user: user.displayName,
            userImg: user.photoURL
        })

        console.log(docSnap)
    }

    const clearMessage = () => {
        chatRef.current.scrollIntoView({ behavior: "smooth" })
        setInput("")
    }

    return (
        <StyledChatInput onSubmit={(e) => {
            sendMessage(e);
            clearMessage()
        }} >
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder={`message ${channelName || ""} room`} />

            <button type='submit' hidden>send</button>
        </StyledChatInput>
    )
}

const StyledChatInput = styled.form`
    width:95%;
    margin:0 auto;
    background-color:#f1f1f1;
    margin-bottom:.5em;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    input{
        width:100%;
        background-color:transparent;
        color:black;
        border:1px solid #333;
        padding:1.5em;
        font-size:1rem;
    }
`

export default ChatInput