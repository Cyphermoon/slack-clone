import { Add } from '@mui/icons-material'
import { collection, doc, setDoc } from 'firebase/firestore'
import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useNavContext } from '../context/NavProvider'
import { db } from '../firebase'
import { usePromptModal } from '../hooks/util.hook'
import { chatContextActions } from '../store/chat_slice'
import { roomActions } from '../store/room_slice'
import { workSpaceActions } from '../store/workspace_slice'
import PromptModal from './modals/PromptModal'
import Workspace from './Workspace'

const WorkspaceMenu = () => {
    const dispatch = useDispatch()
    const { navOpened } = useNavContext()

    const { promptModalDisplayed, closeModal, openPromptModal } = usePromptModal()
    const workSpaceActiveId = useSelector((state) => state.workspace.activeId)
    const [workspaces, loading] = useCollection(collection(db, "workspace"))


    const addWorkSpace = async (workSpaceName) => {
        const workSpaceRef = collection(db, "workspace")

        if (workSpaceName) {
            try {
                await setDoc(doc(workSpaceRef), {
                    name: workSpaceName
                })
            } catch (err) {
                alert(err.message)
            }
        }
    }

    const setActiveId = (id) => {
        dispatch(workSpaceActions.setActiveId({ id }))
        dispatch(roomActions.selectChannel({ id: false }))
        dispatch(chatContextActions.selectChatContext({ chatContextMode: null }))
    }

    return (
        <StyledWorkspaceMenu className={navOpened && "opened"}>
            {!loading && workspaces.docs.map((doc) => {
                const { name } = doc.data()
                const id = doc.id

                return <Workspace
                    key={id}
                    id={id}
                    initials={name && name[0]}
                    handleClick={(id) => setActiveId(id)}
                    active={id === workSpaceActiveId} />
            })}

            <StyledAddChannel onClick={() => {
                openPromptModal()
            }}>
                <Add />
            </StyledAddChannel>


            {promptModalDisplayed &&
                <PromptModal
                    onClose={closeModal}
                    message={"What is the workspace name"}
                    placeholder="Enter a workspace name"
                    onSuccess={(workSpaceName) => addWorkSpace(workSpaceName)} />}
        </StyledWorkspaceMenu>
    )
}

const StyledWorkspaceMenu = styled.section`
    height:100%;
    overflow:scroll;
    padding:1.3em 1.1em;
    padding-top:calc(${({ theme }) => theme.spacing_top_from_header} + 10px);
    background-color:var(--slack-color);


    & > * + *{
        margin-top:1em;
    }

    @media screen and (max-width:${({ theme }) => theme.breakpoint.sm}){
      display:none;

      &.opened{
        display:block;
      }
    }
`

const StyledAddChannel = styled.div`
    object-fit:contain;
    aspect-ratio: 1 / 1;
    width:35px;
    border-radius:50%;
    display:block;
    cursor:pointer;
    border-radius:7px;
    padding:.2em;
    transition:all 200ms linear;
    background-color: rgba(20,20,20,0.8);
    // backdrop-filter:blur(50px);
    display:flex;
    align-items:center;
    justify-content:center;
    text-align:center;
    transform:scale(1);
    transition:transform 200ms linear;

    :hover{
        transform: scale(1.1);
    }

    svg{
        color:white;
    }
`

export default WorkspaceMenu