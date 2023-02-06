import { useState } from "react"


export const useModal = () => {
    const [modalDisplayed, setModal] = useState(false)

    const closeModal = () => {
        setModal(false)
    }

    const openModal = () => {
        setModal(true)
    }

    return { closeModal, openModal, modalDisplayed }
}