import React, { useState } from 'react'
import ReactDOM from "react-dom"
import styled from 'styled-components'
import BackgroundOverlay from '../common/BackgroundOverlay'

const PromptModal = ({ onClose, onSuccess, message, placeholder }) => {
    const [promptValue, setPromptValue] = useState("")

    const submitChannel = (e) => {
        e.preventDefault();

        onSuccess(promptValue)

        setPromptValue("")
        onClose()
        return false;
    }

    return ReactDOM.createPortal(
        <>
            <BackgroundOverlay >
                <StyledPromptModal>
                    <StyledPromptHeader>
                        <h2>{message}</h2>
                    </StyledPromptHeader>

                    <StyledChannelForm onSubmit={submitChannel}>
                        <input type="text"
                            value={promptValue}
                            onChange={(e) => setPromptValue(e.target.value)}
                            placeholder={placeholder || "Enter a value"} />

                        <div className='form_btn'>
                            <button className='cancel_btn' onClick={onClose}>cancel</button>
                            <button type='submit' className='submit_btn'>Done</button>
                        </div>


                    </StyledChannelForm>
                </StyledPromptModal>
            </BackgroundOverlay>
        </>

        , document.getElementById("portal"))
}

const StyledPromptModal = styled.div`
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    width:90%;
    max-width:600px;
    border-radius:15px;
    box-shadow:3px 2px 20px rgb(50, 50, 50);
    padding:1em 2em;
    z-index:200;
    background-color:white;

    button{
        outline:none;
        border:none;
    }
`

const StyledPromptHeader = styled.div`
    display:flex;
    justify-content:space-between;
    // background-color:var(--slack-color);
    color:black;
    margin-bottom:1.5em;

    button{
        background-color:transparent;
        font-size:2rem;
        color:red;
    }
`

const StyledChannelForm = styled.form`
    width:100%;
    display:flex;
    flex-direction:column;
    & > * + *{
        margin-top:1em;
    }

    input[type="text"]{
        border:none;
        outline:none;
        padding:.6em 1em;
        font-size:.99rem;
        background-color:#e0e0e0;
        width:100%;
        height:50px;

    }

    .form_btn{
        align-self:flex-end;

        & > * + *{
            margin-left:.7em;
        }

        button{
            display:inline-block;
            font-size:.98rem;
            padding:.5em  .8em;
            border-radius:5px;
            color:white;

            &:hover{
                opacity:.8;
                cursor:pointer;
            }
        }

        .submit_btn{
            background-color:var(--slack-color);
        }
        .cancel_btn{
            background-color:red;
        }
    }

    .submit_btn{
        display:inline-block;
        font-size:.98rem;
        padding:.77em  1em;
        background-color:var(--slack-color);
        color:white;
        border-radius:5px;
    }`


export default PromptModal