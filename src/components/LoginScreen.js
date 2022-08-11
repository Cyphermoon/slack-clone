import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import styled from 'styled-components'
import { auth, provider } from '../firebase'

const LoginScreen = () => {

    const signIn = (e) => {
        signInWithPopup(auth, provider)
            .catch((err) => console.error(err.message))
    }


    return (
        <StyledLoginScreen>
            <div className='login_modal'>
                <img src="/images/slack_logo.png" alt="slack logo" />
                <h2>Welcome back</h2>
                <span>sign in with your google account</span>
                <button onClick={signIn}>Sign in</button>
            </div>
        </StyledLoginScreen>
    )
}

const StyledLoginScreen = styled.section`
    width:100%;
    height:100%;
    display:grid;
    place-items:center;
    background-color:#f8f8f8;

    .login_modal{
        box-shadow: 0px 3px 10px
        rgba(0,0,0,0.2);
        padding:5em;
        display:flex;
        flex-direction:column;
        align-items:center;
        border-radius:15px;

        & > * + *{
            margin-top:.55em;
        }
    }

  

    img{
        aspect-ratio: 1 / 1;
        display:block;
        width:150px;
        object-fit:contain;
    }

    h2{
        font-size:1.7rem;
        font-weight:500;
    }

    span{
        opacity:.87;
        font-size:.88rem;
    }

    button{
        display:block;
        background-color:green;
        color:white;
        padding:.65em 1em;
        border-radius:5px;
        font-size:1rem;
        border:none;
        outline:none;
        cursor:pointer;
    }
`

export default LoginScreen