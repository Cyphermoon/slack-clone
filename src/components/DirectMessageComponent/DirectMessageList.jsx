import React from 'react'
import styled from 'styled-components'
import DirectMessageItem from './DirectMessageItem'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { IconButton } from '@mui/material';
import PromptModal from '../modals/PromptModal';
import { usePromptModal } from '../../hooks/util.hook';
import { collection, doc, getDoc, query, setDoc, where } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection} from 'react-firebase-hooks/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { chatContextActions } from '../../store/chat_slice';
import { otherUserActions } from '../../store/other_user_slice';


const DirectMessageList = () => {
  const [user] = useAuthState(auth)
  const dispatch = useDispatch()
  const userId = user.email
  const workSpaceActiveId = useSelector((state) => state.workspace.activeId)
  const [friendsList, loading] = useCollection(query(collection(db, "users", userId, "friends"), where("workSpaceId", "==", workSpaceActiveId)))
  const { promptModalDisplayed, closeModal, openPromptModal } = usePromptModal()


  const getUser = async (id) => {
    let userRef = doc(db, "users", id)
    let userDoc = await getDoc(userRef)

    return userDoc.exists() ? userDoc : undefined 
  }

  const createChat = async (currentUserId, friendId, friendName, workSpaceId) => {
    let chatId = `${currentUserId}_${friendId}_${workSpaceId}`

    let chatDocRef = doc(db, "chats", chatId)

    await setDoc(chatDocRef, {
      workSpaceId: workSpaceActiveId,
      users: [currentUserId, friendId],
      name: friendName,
    }, {merge:true})

    return chatId
  }

  const handleCreateChat = async (userEmail) => {
    if(!userEmail) return
    
    let userDoc = await getUser(userEmail)

    if(!userDoc){
      alert("This user does not exist")
      return
    }

    let friendId = userDoc.id
    let otherUserData = userDoc.data()

    let chatId = await createChat(user.email, userEmail, otherUserData.name, workSpaceActiveId)
    console.log(chatId)
    
    let userFriendsCollectRef = collection(db, "users", userId, "friends")
    await setDoc(doc(userFriendsCollectRef), {
      workSpaceId: workSpaceActiveId,
      chatId,
      email:otherUserData.email,
      name:otherUserData.name,
      friendId,
      photoUrl:otherUserData.photoUrl
    })

    let newFriendCollectionRef = collection(db, "users", userEmail, "friends")

    await setDoc(doc(newFriendCollectionRef), {
      workSpaceId: workSpaceActiveId,
      chatId,
      name:user.displayName,
      email:user.email,
      friendId: userId,
      photoUrl: user.photoURL
    })

  }

  const handleClick = (chatId, chatContextMode, otherUserName) => {
    dispatch(otherUserActions.updateOtherUserName({name: otherUserName }))
    dispatch(chatContextActions.selectChatContext({chatContextMode}))
    dispatch(chatContextActions.selectChatId({chatId}))
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

        return(
           <DirectMessageItem
           key={idx}
           name={directMessage.name}
           photoUrl={directMessage.photoUrl}
           chatId={directMessage.chatId}
           handleClick={handleClick} />
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