import styled from "styled-components";

export const StyledContextArea = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;

  @media screen and (max-width: ${({ theme }) => theme.breakpoint.sm}) {
   &{
      --container-padding: 1em;
      flex-direction:column; 
      justify-between: space-between;
      margin: 0 auto;
      width: calc(100% - (var(--container-padding) * 2))
    }

    & > * + *{
      margin-top: 2em;
    }
  }
`

export const StyledGameBoardSection = styled.section`
    --board-color:#f4f4f4;
    width:100%;
    text-align:center;
    max-width:400px;
    background-color:red;
    border-radius:20px;
    padding:1em .5em;
    transition: all 500ms linear;

    & > * + *{
      margin-top:2em;
    }

    .current_user,
    .restart_game{
        display:inline-block;
        color:var(--board-color);
        font-weight:500;
        font-size:.88rem;
    }

    .restart_game{
      outline:none;
      border:none;
      padding:.5em .35em;
      border-radius:15px;
      text-align:center;
      background-color:var(--board-color);
      color:black;
      cursor:pointer;
    }

    &.disabled{
      pointer-events:none;
      opacity:.8;
      filter: blur(2px);
    }

    @media screen and (max-width: ${({ theme }) => theme.breakpoint.sm}) {
      max-width:unset;
    }
`