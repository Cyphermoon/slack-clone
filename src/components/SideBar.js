import { Chat } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'
import SideBarHeader from './SideBarHeader'
import SideBarOption from './SideBarOption'

const SideBar = () => {
    return (
        <StyledSideBar>
            <SideBarHeader />
            <SideBarOption title={"Threads"} icon={<Chat />} />
        </StyledSideBar>
    )
}

const StyledSideBar = styled.section`
    width:100%;
    max-width:250px;
    padding-left:15px;
    padding-right:10px;
    background-color:var(--slack-color);
    height:100%;
`

export default SideBar