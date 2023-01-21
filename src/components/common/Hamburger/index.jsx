import { StyledIcon, StyledNavBottom, StyledNavMiddle, StyledNavTop } from "./hamburger.style"

const HamburgerIcon = ({ toggleNavDisplay, isOpen, dimension }) => {
    return (
        <StyledIcon
            onClick={toggleNavDisplay}
            className={isOpen && "opened"}
            dimension={dimension}>

            {/*bars */}
            <StyledNavTop />
            <StyledNavMiddle />
            <StyledNavBottom />
        </StyledIcon>
    )
}

HamburgerIcon.defaultProps = {
    dimension: 32,
    isOpen: false,
    toggleNavDisplay: f => f
}

export default HamburgerIcon