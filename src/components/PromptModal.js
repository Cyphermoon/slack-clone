import React, { useState } from 'react'
import ReactDOM from "react-dom"
import styled from 'styled-components'

const PromptModal = ({ onClose, onSuccess, message, placeholder }) => {
    const [promptValue, setPromptValue] = useState("")

    const submitChannel = (e) => {
        e.preventDefault();

        onSuccess(promptValue)

        setPromptValue("")
    }

    return ReactDOM.createPortal(
        <StyledPromptModal>
            <div>
                <h5>{message}</h5>
                <button onClick={onClose}>&times;</button>
            </div>

            <form >
                <input type="text" 
                    value={promptValue}
                    onChange={(e) => setPromptValue(e.target.value) }
                    placeholder={placeholder || "Enter a value"} />

                <button type='submit' onClick={submitChannel}>Done</button>
                </form>
        </StyledPromptModal>
    , document.getElementById("portal"))
}

const StyledPromptModal = styled.div`
`

export default PromptModal