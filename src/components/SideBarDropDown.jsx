import { useState } from 'react'
import styled from 'styled-components'
import SideBarOption from './SideBarOption'


const SideBarDropDown = ({ children, headerTitle, openIcon, closeIcon }) => {
    const [dropDownOpen, setDropDownOpen] = useState(true)
    return (
        <StyledSideBarDropdown >
            <hr />
            <SideBarOption
                title={headerTitle}
                Icon={dropDownOpen ? openIcon : closeIcon}
                handleClick={() => setDropDownOpen(!dropDownOpen)} />

            {dropDownOpen && children}
        </StyledSideBarDropdown>
    )
}


const StyledSideBarDropdown = styled.div`
    hr{
        border:1px solid #49274b;
        outline:none
        display:block;
    }

    & > * + * {
        margin-top:.9em;
    }
`

export default SideBarDropDown