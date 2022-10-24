import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import ChatAreaContext from './ChatAreaContext'
import SideBar from './SideBar'
import WorkspaceMenu from './WorkspaceMenu'

const AppBody = () => {
    const workSpaceActiveId = useSelector((state) => state.workspace.activeId)
    const roomId = useSelector(state => state.room.roomId)
    return (
        <StyledMain>
            <WorkspaceMenu />
            {workSpaceActiveId && <SideBar />}
            {roomId &&
                <ChatAreaContext />
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