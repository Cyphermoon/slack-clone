/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import styled from 'styled-components'
import DirectMessageItem from './DirectMessageItem'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { IconButton } from '@mui/material';
import PromptModal from './PromptModal';
import { usePromptModal } from '../hooks/util.hook';
import { collection, doc, getDoc, query, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
// eslint-disable-next-line no-unused-vars
import { useCollection, useDocument, useDocumentOnce } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


const DirectMessageList = () => {
  const [user] = useAuthState(auth)
  const userId = user.email
  const workSpaceActiveId = useSelector((state) => state.workspace.activeId)
  const [friendsList, loading] = useCollection(collection(db, "users", userId, "friends"))
  const { promptModalDisplayed, closeModal, openPromptModal } = usePromptModal()


  const getUser = async (id) => {
    let userRef = doc(db, "users", id)
    let userDoc = await getDoc(userRef)

    return userDoc.exists() ? userDoc : undefined 
  }

  const createChat = async (currentUserId, friendId) => {
    let chatId = `${currentUserId}_${friendId}`

    let chatDocRef = doc(db, "chats", chatId)

    await setDoc(chatDocRef, {
      workSpaceId: workSpaceActiveId,
      users: [currentUserId, friendId]
    }, {merge:true})

    return chatId
  }

  const handleCreateChat = async (userEmail) => {
    if(!userEmail) return
    
    let userDoc = await getUser(userEmail)

    if(!userDoc){
      console.log("user does not exist")
      return
    }

    let friendId = userDoc.id
    let otherUserData = userDoc.data()

    let chatId = await createChat(user.email, userEmail)
    console.log(chatId)
    
    let userFriendsCollectRef = collection(db, "users", userId, "friends")
    await setDoc(doc(userFriendsCollectRef), {
      chatId,
      email:otherUserData.email,
      name:otherUserData.name,
      friendId,
      photoUrl:otherUserData.photoUrl
    })

    let newFriendCollectionRef = collection(db, "users", userEmail, "friends")

    await setDoc(doc(newFriendCollectionRef), {
      chatId,
      name:user.displayName,
      email:user.email,
      friendId: userId,
      photoUrl: user.photoURL
    })

  }

  return (
    <StyledDirectMessages>
      <StyledDirectMessageHeader>
        <h4>Direct Messages</h4>

        <StyledIconButton size={"large"} onClick={() => openPromptModal() }>
          <AddRoundedIcon size={"large"} sx={{color:"white"}} />
        </StyledIconButton>
      </StyledDirectMessageHeader>

      {!loading && friendsList.docs.map((friendDetails, idx) => {
        const directMessage = friendDetails.data()

        console.log(directMessage)

        return(
           <DirectMessageItem
           key={idx}
           name={directMessage.name}
           photoUrl={directMessage.photoUrl}
           chatId={directMessage.chatId} />
        )

      })}

      {promptModalDisplayed &&
                <PromptModal
                    onClose={closeModal}
                    message={"Which user would you like to chat with"}
                    placeholder="Enter a user name"
                    onSuccess={(userName) => handleCreateChat(userName)} />}
    </StyledDirectMessages>
  )
}


const StyledIconButton = styled(IconButton)`
  &&{
  background-color:gray;
  width:35px;
  height:35px;
  padding:.2em;
  border-radius:50%;

  :hover{
    background-color:lightgray;
  }
}
`

const StyledDirectMessageHeader = styled.div`
  display:flex;
  justify-content:space-between;
  width:90%;
  align-items:center;
  margin-bottom:.88em;

  &  h4 {
    color:white;
    font-size:1.08rem;
    font-weight:400;
    text-transform: capitalize;
  }
`

const StyledDirectMessages = styled.div`

`

export default DirectMessageList