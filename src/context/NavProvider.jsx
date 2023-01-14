import React, { useState } from 'react'
import { useContext } from 'react'

const NavContext = React.createContext()
export const useNavContext = () => useContext(NavContext)


const NavProvider = ({ children }) => {
    const [navOpened, setNavOpened] = useState(true)

    const toggleNavState = () => {
        setNavOpened(!navOpened)
    }

    return (
        <NavContext.Provider value={{ navOpened, setNavOpened, toggleNavState }}>
            {children}
        </NavContext.Provider>
    )
}

export default NavProvider