import React from 'react'
import styled from 'styled-components'
import ChatArea from './ChatArea'
import SideBar from './SideBar'

const AppBody = () => {
    return (
        <StyledMain>
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