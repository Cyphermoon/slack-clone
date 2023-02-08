import React, { useState } from 'react'
import styled from 'styled-components'
import DirectMessageItem from './DirectMessageItem'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { IconButton } from '@mui/material';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { chatContextActions } from '../../store/chat_slice';
import { otherUserActions } from '../../store/other_user_slice';
import { currentUserActions } from '../../store/user_slice';
import WorkSpaceUserList from '../modals/WorkSpaceUserList';
import { useModal } from '../../hooks/util.hook';


const DirectMessageList = () => {
  //TODO create a separate file for all the functions hear

  const [visibleUsers, setVisibleUsers] = useState([])
  const workSpaceActiveId = useSelector((state) => state.workspace.activeId)
  const dispatch = useDispatch()
  const { modalDisplayed, closeModal, openModal } = useModal()
  const [user] = useAuthState(auth)
  const userId = user.email

  //query user's friends list
  const [friendsList, loading] = useCollection(query(collection(db, "users", userId, "friends"), where("workSpaceId", "==", workSpaceActiveId)))


  const getUser = async (id) => {
    let userRef = doc(db, "users", id)
    let userDoc = await getDoc(userRef)

    return userDoc.exists() ? userDoc : undefined
  }

  const getProfileVisibleUsers = async () => {
    // Get a list of users that allows to be chat with

    const visibleUsersQuery = query(collection(db, "users"), where("profileVisible", "==", true))
    const visibleUserList = await getDocs(visibleUsersQuery);

    return visibleUserList
  }

  const createChat = async (currentUserId, friendId, friendName, workSpaceId) => {
    // creates the chat in the database

    let chatId = `${currentUserId}_${friendId}_${workSpaceId}`

    let chatDocRef = doc(db, "chats", chatId)

    await setDoc(chatDocRef, {
      workSpaceId: workSpaceActiveId,
      users: [currentUserId, friendId],
      name: friendName,
    }, { merge: true })

    return chatId
  }

  const isAlreadyFriend = async (currentUserId, inputEmail, workSpaceId) => {
    /*
      *return true if the input user is already a friend
      * otherwise. return false 
     */

    let friendExists = false

    //query to get current user friend's email
    const q = query(
      collection(db, "users", currentUserId, "friends"),
      where("email", "==", inputEmail), where("workSpaceId", "==", workSpaceId)
    )

    const friendsList = await getDocs(q)
    friendsList.forEach((doc) => {
      if (doc.exists()) friendExists = true
    })

    return friendExists
  }

  const handleCreateChat = async (userEmail) => {
    if (!userEmail) return
    if (userEmail === user.email) {
      alert("You can't add yourself")
      return
    }

    let userDoc = await getUser(userEmail)

    if (!userDoc) {
      alert("This user does not exist")
      return
    }

    let isFriend = await isAlreadyFriend(userId, userEmail, workSpaceActiveId)

    if (isFriend) {
      alert("user is already in your dm")
      return
    }

    let friendId = userDoc.id
    let otherUserData = userDoc.data()

    let chatId = await createChat(user.email, userEmail, otherUserData.name, workSpaceActiveId)

    let userFriendsCollectRef = collection(db, "users", userId, "friends")
    await setDoc(doc(userFriendsCollectRef), {
      workSpaceId: workSpaceActiveId,
      chatId,
      email: otherUserData.email,
      name: otherUserData.name,
      friendId,
      photoUrl: otherUserData.photoUrl
    })

    let newFriendCollectionRef = collection(db, "users", userEmail, "friends")

    await setDoc(doc(newFriendCollectionRef), {
      workSpaceId: workSpaceActiveId,
      chatId,
      name: user.displayName,
      email: user.email,
      friendId: userId,
      photoUrl: user.photoURL
    })

  }

  const handleAddUserClicked = async () => {
    // set the state visible users
    const visibleUsers = await getProfileVisibleUsers();
    setVisibleUsers(visibleUsers.docs)
    openModal()
  }

  const handleVisibleUserClicked = (username) => {
    // creates a chat a user is clicked from visible user list modal

    closeModal()
    handleCreateChat(username)
  }

  const handleClick = (chatId, chatContextMode, otherUserName, otherUserId) => {
    dispatch(otherUserActions.updateOtherUserName({ name: otherUserName }))
    dispatch(otherUserActions.updateOtherUserId({ id: otherUserId }))
    dispatch(chatContextActions.selectChatContext({ chatContextMode }))
    dispatch(chatContextActions.selectChatId({ chatId }))
    dispatch(currentUserActions.updateUserId({ id: userId }))
    dispatch(currentUserActions.updateUserName({ name: user.displayName }))
  }


  return (
    <StyledDirectMessages>
      <StyledDirectMessageHeader>
        <h4>Direct Messages</h4>

        <StyledIconButton size={"large"} onClick={handleAddUserClicked}>
          <AddRoundedIcon size={"large"} sx={{ color: "white" }} />
        </StyledIconButton>
      </StyledDirectMessageHeader>

      {!loading && friendsList.docs.map((friendDetails, idx) => {
        const directMessage = friendDetails.data()

        return (
          <DirectMessageItem
            key={idx}
            name={directMessage.name}
            photoUrl={directMessage.photoUrl}
            chatId={directMessage.chatId}
            otherUserId={directMessage.friendId}
            handleClick={handleClick} />
        )

      })}
      {modalDisplayed &&
        <WorkSpaceUserList
          workSpaceUsers={visibleUsers}
          loading={!visibleUsers}
          closeModal={closeModal}
          handleUserClicked={handleVisibleUserClicked} />}
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
  & > * + *{
    margin-top:.7em;
  }

`

export default DirectMessageList