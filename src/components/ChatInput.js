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

        chatRef.current.scrollIntoView({ behavior: "smooth" })

        console.log(docSnap);

        setInput("")
    }

    return (
        <StyledChatInput onSubmit={(e) => sendMessage(e)} >
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
    position:absolute;
    z-index:5;
    width:90%;
    background-color:#f1f1f1;
    bottom:20px;
    left:50%;
    transform: translateX(-50%);

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