import { collection } from 'firebase/firestore'
import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { db } from '../firebase'
import { workSpaceActions } from '../store/workspace_slice'
import Workspace from './Workspace'

const WorkspaceMenu = () => {
    const dispatch = useDispatch()
    const workSpaceActiveId = useSelector((state) => state.workspace.activeId)
    const [workspaces, loading] = useCollection(collection(db, "workspace"))

    const setActiveId = (id) => {
        dispatch(workSpaceActions.setActiveId({ id }))
    }

    return (
        <StyledWorkspaceMenu>
            {!loading && workspaces.docs.map((doc) => {
                const { name } = doc.data()
                const id = doc.id

                return <Workspace
                    key={id}
                    id={id}
                    initials={name[0]}
                    handleClick={(id) => setActiveId(id)}
                    active={id === workSpaceActiveId} />
            })}

        </StyledWorkspaceMenu>
    )
}

const StyledWorkspaceMenu = styled.section`
    width:5%;
    height:100%;
    overflow:scroll;
    padding:1em .75em;
    padding-top:80px;
    background-color:var(--slack-color);


    & > * + *{
        margin-top:1em;
    }
`

export default WorkspaceMenu