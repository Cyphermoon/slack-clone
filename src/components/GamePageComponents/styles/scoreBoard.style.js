import styled from 'styled-components'

export const StyledBoardSection = styled.section`
    margin-right:12em;
    background-color:#f4f4f4;
    width:100%;
    max-width:310px;
    min-height:290px;
    border-radius:20px;
    padding:1em 1.5em;
    display:grid;
    grid-template-columns:repeat(2, 1fr);
    gap: .5em;

    @media screen and (max-width: ${({ theme }) => theme.breakpoint.sm}) {
        &{
           margin-right: unset;
           max-width:unset;
           min-height:100px;
         }
       }
`

export const StyledUserScore = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;

    & > * + *{
        margin-top:.5em;
    }

    h3{
        font-size: 1rem;
        font-size:min(3.5vw, 1rem);
        font-weight:400;
        text-transform: capitalize;
        word-wrap: break-word;
    }

    span{
        font-size:min(10vw, 5rem);
        font-weight:400;
        color:#444;
    }

    @media screen and (max-width: ${({ theme }) => theme.breakpoint.sm}) {
        & > * + *{
            margin-top:.2em;
        }
       }
`