import { useState } from "react"


export const usePromptModal = () => {
    const [promptModalDisplayed, setPromptModal] = useState(false)

    const closeModal = () => {
        setPromptModal(false)
    }

    const openPromptModal = () => {
        setPromptModal(true)
    }

    return { closeModal, openPromptModal, promptModalDisplayed }
}