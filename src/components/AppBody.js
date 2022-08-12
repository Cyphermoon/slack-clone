import React from 'react'
import styled from 'styled-components'
import ChatArea from './ChatArea'
import SideBar from './SideBar'
import WorkspaceMenu from './WorkspaceMenu'

const AppBody = () => {
    return (
        <StyledMain>
            <WorkspaceMenu />
            <SideBar />
            <ChatArea />
        </StyledMain>
    )
}

const StyledMain = styled.main`
    display:flex;
    align-items:flex-start;
    height:100%;
`

export default AppBody