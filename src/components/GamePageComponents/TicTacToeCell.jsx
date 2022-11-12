import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { AIMultiplayerContext } from '../../constants/GameConstant.constant'

const TicTacToeCell = ({position,handleCellClicked, className}) => {
  const gameContext = useSelector((state) => state.ticTacToe.context)

  return (
    <>
      {gameContext === AIMultiplayerContext ?
      <StyledCell 
        id={position} 
        className={`tic_tac_toe_cell ${className}`} 
        onClick={(e) =>handleCellClicked(e, position)}/>:
      <StyledCell className={`tic_tac_toe_cell ${className}`} onClick={(e) =>handleCellClicked(e, position)}/>
    }
    </>
  
  
  )
}

const StyledCell = styled.div`
    position:relative;
    display:flex;
    align-items:center;
    justify-content:center;
    width:auto;
    border:2px solid var(--board-color);
    margin:0;
    cursor:pointer;


    /*clearing top border*/
    :nth-child(1),
    :nth-child(2),
    :nth-child(3){
      border-top:none;
    }

    /*clearing left border*/
    :nth-child(3n){
      border-right:none;
    }

    /*clearing bottom border*/
    :nth-child(7),
    :nth-child(8),
    :nth-child(9){
      border-bottom:none;
    }

    /*clearing left border*/
    :nth-child(3n - 2){
      border-left:none;
    }

    &.x::before,
    &.x::after{
        content:'';
        background-color:var(--board-color);
        position:absolute;
        width:8px;
        height:50px;
    }

    &.x::before{
        transform: rotate(45deg)
    }

    &.x::after{
        transform: rotate(-45deg)
    }

    &.o::before,
    &.o::after{
        content:'';
        background-color:transparent;
        border:5px solid var(--board-color);
        position:absolute;
        border-radius:50%;
        width:50px;
        height:50px;
    }  
`

export default TicTacToeCell