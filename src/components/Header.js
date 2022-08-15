import AccessTimeIcon from '@mui/icons-material/AccessTime';
import React from 'react'
import styled from 'styled-components'
import { Help, Search } from '@mui/icons-material';
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from '../firebase';


const Header = () => {
    const [user, loading] = useAuthState(auth);

    return (
        <StyledHeaderContainer>
            <StyledHeaderLeft>
                {!loading &&
                    <StyledAvatar referrerPolicy="no-referrer" src={user?.photoURL} alt={user?.displayName} onClick={() => auth.signOut()} />}
                <AccessTimeIcon />
            </StyledHeaderLeft>

            <StyledHeaderSearch>
                <Search />
                <input type="text" placeholder='Search Workspace' />
            </StyledHeaderSearch>

            <StyledHeaderRight>
                <Help />
            </StyledHeaderRight>
        </StyledHeaderContainer>
    )
}

const StyledHeaderContainer = styled.div`
    background-color:var(--slack-color);
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:5px 20px;
    color:white;
    position:fixed;
    top:0;
    left:0;
    width:100vw;
    z-index:10;
`

const StyledHeaderLeft = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    width:30%;
    max-width:150px;
}
`

const StyledHeaderSearch = styled.div`
    display:flex;
    align-items:center;
    width:40%;
    max-width:500px;
    background-color:var(--slack-color)11;
    border:1px solid lightgray;
    color:gray;
    padding:5px;
    border-radius:9px;

    // & > .MuiSvgIcon-root{
    //     color:white;
    // }

    & > input{
        flex-grow:1;
        outline:none;
        border:none;
        font-size:.99rem;
        padding:.2em;
        color:white;
        background-color:transparent;
    }
`

const StyledAvatar = styled.img`
    object-fit:contain;
    aspect-ratio: 1 / 1;
    width:40px;
    border-radius:50%;
    cursor:pointer;

    &:hover{
        opacity:.8;
    }

    `

const StyledHeaderRight = styled.div`
    width:30%;
    max-width:150px;
    text-align:right;
    justify-self:self-end;

`

export default Header