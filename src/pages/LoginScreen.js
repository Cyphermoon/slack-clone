import { signInWithPopup } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import React from 'react'
import styled from 'styled-components'
import { auth, db, provider } from '../firebase'

const LoginScreen = () => {
    const signIn = async (e) => {
        await signInWithPopup(auth, provider)
            .then(async (data) => {
                let usersCollectionRef = doc(db, "users", `${data.user.email}`)

                await setDoc(usersCollectionRef, {
                    name: data.user.displayName,
                    email: data.user.email,
                    photoUrl: data.user.photoURL,
                }, { merge: true })
            })
            .catch((err) => console.error(err.message))
    }


    return (
        <StyledLoginScreen>
            <div className='login_modal'>
                <img src="/images/slack_logo.png" alt="slack logo" />
                <h2>Welcome</h2>
                <span>sign in with your google account</span>
                <button onClick={signIn}>Sign in</button>
            </div>
        </StyledLoginScreen>
    )
}

const StyledLoginScreen = styled.section`
    width:100vw;
    height:100vh;
    display:grid;
    place-items:center;
    background-color:#f8f8f8;

    .login_modal{
        box-shadow: 0px 3px 10px
        rgba(0,0,0,0.2);
        padding:2em;
        display:flex;
        flex-direction:column;
        align-items:center;
        border-radius:15px;
        width:95%;
        max-width:400px;

        & > * + *{
            margin-top:.95em;
        }
    }

  

    img{
        aspect-ratio: 1 / 1;
        display:block;
        width:150px;
        height:auto;
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