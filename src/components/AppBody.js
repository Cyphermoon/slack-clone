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
    return (
        <StyledMain>
            <WorkspaceMenu />
            {workSpaceActiveId && <SideBar />}
            {chatContext === "roomChat" ?
                <RoomChatContext /> :
                chatContext === "directMessage" && <DirectMessageChatContext />
            }
        </StyledMain>
    )
}

const StyledMain = styled.main`
    display:flex;
    align-items:flex-start;
    height:100vh;
`

export default AppBody