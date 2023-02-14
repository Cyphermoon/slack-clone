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
        <StyledMain className={navOpened && "opened"}>
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
    margin-top:${({ theme }) => theme.spacing_top_from_header};
    height: calc(100vh - ${({ theme }) => theme.spacing_top_from_header});

    @media screen and (max-width: ${({ theme }) => theme.breakpoint.sm}){
        &.opened{
            &::after{
            content: "";
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, .4);
            z-index: 1;
        }
    }
}

`

const StyledMenuContainer = styled.div`
    padding-top:.75em;
    display: flex;
    height: 100%;
    background-color:var(--slack-color);

    @media screen and (max-width: ${({ theme }) => theme.breakpoint.sm}){
        position: fixed;
        z-index: 50;
        transform: translateX(-300%);
        transition: transform 300ms linear;
        overflow-y: scroll;
        height: calc(100% - ${({ theme }) => theme.spacing_top_from_header});

        &.opened{
            transform: translateX(0%);
        }
    }
`

export default AppBody