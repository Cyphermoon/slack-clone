import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import ChatArea from './ChatArea'
import SideBar from './SideBar'
import WorkspaceMenu from './WorkspaceMenu'

const AppBody = () => {
    const workSpaceActiveId = useSelector((state) => state.workspace.activeId)
    const roomId = useSelector(state => state.room.roomId)

    console.log("roomid " + roomId, "        work space id " + workSpaceActiveId)

    return (
        <StyledMain>
            <WorkspaceMenu />
            {workSpaceActiveId && <SideBar />}
            {roomId && <ChatArea />}
        </StyledMain>
    )
}

const StyledMain = styled.main`
    display:flex;
    align-items:flex-start;
    height:100%;
`

export default AppBody