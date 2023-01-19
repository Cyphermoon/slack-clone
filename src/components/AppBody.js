import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import DirectMessageChatContext from './DirectMessageComponent/DirectMessageChatContext'
import RoomChatContext from './RoomChatsContext'
import SideBar from './SideBar'
import WorkspaceMenu from './WorkspaceMenu'

const AppBody = () => {
    const workSpaceActiveId = useSelector((state) => state.workspace.activeId)
    const chatContext = useSelector(state => state.chatContext.context)
    const navOpened = useSelector(state => state.navState.isOpen)

    return (
        <StyledMain>
            <StyledMenuContainer className={navOpened && "opened"}>
                <WorkspaceMenu />
                {workSpaceActiveId && <SideBar />}
            </StyledMenuContainer>
            {chatContext === "roomChat" && <RoomChatContext />}
            {chatContext === "directMessage" && <DirectMessageChatContext />}

        </StyledMain>
    )
}

const StyledMain = styled.main`
    display:flex;
    align-items:flex-start;
    height:100vh;
`

const StyledMenuContainer = styled.div`
    display:flex;
    height:100%;

    @media screen and (max-width:${({ theme }) => theme.breakpoint.sm}){
     position:absolute;
     z-index:50;
     transform: translateX(-100%);
     transition: transform 200ms linear; 
     overflow-y: scroll;

     &.opened{
         transform: translateX(0%);
     }
    }
`

export default AppBody