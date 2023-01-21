import styled from "styled-components"

export const StyledNavBottom = styled.span`
    top:0px
`
export const StyledNavMiddle = styled.span`
    top:8px;
`
export const StyledNavTop = styled.span`
    top:16px
`

export const StyledIcon = styled.div`
    --dimension_width:${({ dimension }) => dimension}px;
    width:  var(--dimension_width);
    min-height: 18px;
    position:relative;
    z-index:10;
    cursor:pointer;
    width: 2rem;

    @media screen and (min-width: ${({ theme }) => theme.breakpoint.sm}) {
        display: none;
    }

    & > *{
        position:absolute;
        background-color: lightgray;
        width:100%;
        opacity:1;
        border-radius:15px;
        height:3px;
        display:inline-block;
        transition:all 200ms linear;
        transform-origin:left center;
        left:0;
    }

    &.opened{

        ${StyledNavTop}{
            transform:rotate(45deg);
            top:-3px
        }
       
        ${StyledNavMiddle}{
            transform:translateX(-70%);
            opacity:0;
        }

        ${StyledNavBottom}{
         
            justify-self:flex-start;
            transform:rotate(-45deg);
            top:19px;
        }
    }`