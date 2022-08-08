import { collection, doc, getDoc, serverTimestamp, setDoc, Timestamp } from 'firebase/firestore';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { db } from '../firebase';

const ChatInput = ({ channelName }) => {
    const [input, setInput] = useState("");
    const roomId = useSelector((state) => state.room.roomId);

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!roomId) return false

        const messagesCollectionRef = collection(db, "rooms", roomId, "messages")

        const docSnap = await setDoc(doc(messagesCollectionRef), {
            content: input,
            serverTimeStamp: serverTimestamp(),
            user: "Cypher moon",
            userImg: "#"
        })

        console.log(docSnap);

        setInput("")
    }

    return (
        <StyledChatInput onSubmit={(e) => sendMessage(e)} >
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder={`message ${channelName || "room"}`} />

            <button type='submit' hidden>send</button>
        </StyledChatInput>
    )
}

const StyledChatInput = styled.form`
    position:absolute;
    width:80%;
    max-width:450px;
    border:1px solid #ccc;
    background-color:#f1f1f1;
    border-radius:2px;
    bottom:50px;
    left:50%;
    transform: translateX(-50%);

    input{
        width:100%;
        background-color:transparent;
        color:black;
        border:1px solid #333;
        padding:1em .5em;
        font-size:1rem;
    }
`

export default ChatInput