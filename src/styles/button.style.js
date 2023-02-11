import { IconButton } from "@mui/material";
import styled from "styled-components";

export const StyledIconButton = styled(IconButton)`
  &&{
  background-color:gray;
  width:30px;
  height:30px;
  padding:.2em;
  border-radius:50%;

  :hover{
    background-color:lightgray;
  }
}
`