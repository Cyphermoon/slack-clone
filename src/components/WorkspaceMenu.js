import { Add } from '@mui/icons-material'
import { collection, doc, setDoc } from 'firebase/firestore'
import React, { useCallback, useEffect } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { db } from '../firebase'
import { useModal } from '../hooks/util.hook'
import { chatContextActions } from '../store/chat_slice'
import { navStateActions } from '../store/navState_slice'
import { roomActions } from '../store/room_slice'
import { workSpaceActions } from '../store/workspace_slice'
import PromptModal from './modals/PromptModal'
import Workspace from './Workspace'

const WorkspaceMenu = () => {
    const dispatch = useDispatch()
    const navOpened = useSelector(state => state.navState.isOpen)

    const { modalDisplayed, closeModal, openModal } = useModal()
    const workSpaceActiveId = useSelector((state) => state.workspace.activeId)
    const [workspaces, loading] = useCollection(collection(db, "workspace"))
    const isSmallScreen = window.matchMedia(`(max-width: 32em)`)


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

    const closeNav = useCallback((e) => {
        if (e.target.hasAttribute("data-close-nav")) {
            dispatch(navStateActions.setNavState({ isOpen: false }))
        }

    }, [dispatch])

    useEffect(() => {
        if (!isSmallScreen.matches) return

        document.addEventListener("click", closeNav)

        return () => document.removeEventListener("click", closeNav)
    }, [closeNav, isSmallScreen.matches])

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
                openModal()
            }}>
                <Add />
            </StyledAddChannel>


            {modalDisplayed &&
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
    padding:0 1.1em;

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