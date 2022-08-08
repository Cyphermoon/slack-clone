import { Edit, FiberManualRecord } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'

const SideBarHeader = () => {
    return (
        <StyledSideBarHeader>
            <StyledInfoGroup>
                <h3>
                    User Channel
                </h3>

                <span>
                    <FiberManualRecord />
                    <small>sonny sanga</small>
                </span>
            </StyledInfoGroup>

            <Edit />

        </StyledSideBarHeader>
    )
}


const StyledSideBarHeader = styled.div`
        display:flex;
        align-items:center;
        justify-content:space-between;

        & > .MuiSvgIcon-root{
            font-size:1.35rem;
            background-color:white;
            padding:5px;
            width:1.4em;
            height:1.4em;
            border-radius:50%;
        }
`

const StyledInfoGroup = styled.div`
     & > h3{
        color:white;
        font-size:1.35rem;
        font-weight:600;
        text-transform: capitalize;
        margin-bottom:.15em;
     }

     span{
        --font-size:.9;
        display:flex;
        align-items:center;
        font-size:var(--font-size)rem;
        color:white;
        opacity:.87;

        & > .MuiSvgIcon-root{
            font-size:var(--font-size)em;
            color:green;
        }
     }
`



export default SideBarHeader