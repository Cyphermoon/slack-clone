import { ChevronLeft } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const GameHeader = () => {
  return (
    <StyledHeader>
        <StyledNav>
            <ul>
                <li className='return_to_chat'>
                    <ChevronLeft />
                    <Link to={"/"}>return to chat</Link>
                    </li>
                <li><button>Finish Game</button></li>
            </ul>
        </StyledNav>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
    background-color:var(--slack-color);
    padding:7px 20px;


`

const StyledNav = styled.nav`
    width:95%;

    ul{
        width:100%;
        padding:0;
        margin:0;
        list-style:none;
        display:flex;
        align-items:center;
        justify-content:space-between;
    }
    
    button{
        background-color:white;
        border-radius:10px;
        color:black;
        border:none;
        outline:none;
        padding:.5em .35em;
    }

    li.return_to_chat{
        display:flex;
        cursor:pointer;

        .MuiSvgIcon-root{
            color:white;
            font-size:1.5em
        }

        a{
            color:white;
            text-decoration:underline;
        }
       
    }
`

export default GameHeader