/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useReducer } from 'react';
import styled from 'styled-components'
import TicTacToeCell from './TicTacToeCell'

const GameBoard = () => {
  const X = "x";
  const O = 'o'
  const [currentLetter, setCurrentLetter] = useState(X);
  const [playerWon, togglePlayerWin] = useReducer((initialState) => !initialState, true)
  const isXCurrentPlayer = currentLetter === X

  const initBoard = () => {
    let board = {}

    for (let i = 1; i < 10; i++) {
      board[i] = ""
    }
    return board
  }

  const gameBoardReducer = (initialState, action) => {
    let pos = action.position
    return {
      ...initialState,
      [pos]: action.value
    }
  }

  const [gameBoard, setGameBoard] = useReducer(gameBoardReducer, null, initBoard)

  const isWinningMove = (gameBoard, currentPlayer) => {
    let winningMoves = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7]
    ]


    return winningMoves.some((move) => {
      return (
        (gameBoard[move[0]] === currentPlayer) &&
        (gameBoard[move[1]] === currentPlayer) &&
        (gameBoard[move[2]] === currentPlayer)
      )
    })


    // return((gameBoard[1] && gameBoard[2] && gameBoard[3]) ||
    //   (gameBoard[4] && gameBoard[5] && gameBoard[6])  ||
    //   (gameBoard[7] && gameBoard[8] && gameBoard[9])  ||
    //   (gameBoard[1] && gameBoard[4] && gameBoard[7])  ||
    //   (gameBoard[2] && gameBoard[5] && gameBoard[8])  ||
    //   (gameBoard[3] && gameBoard[6] && gameBoard[9])  ||
    //   (gameBoard[1] && gameBoard[5] && gameBoard[9])  ||
    //   (gameBoard[3] && gameBoard[5] && gameBoard[7])  
    // ) 
  }

  const isBoardFull = (gameBoard) => {
    for (let prop in gameBoard) {
        if (gameBoard.hasOwnProperty(prop)) {
          if (gameBoard[prop] === "") return false
      }
    }
    return true
  }
  
  const handleCellClicked = (e, position, value) => {
    e.target.classList.add(currentLetter)
    setGameBoard({ position, value })

    let result = gameBoardReducer(gameBoard, { position, value })

    if(isWinningMove(result, currentLetter)){
     //display winner
     //update score
    }
    else if(isBoardFull(result)){
      console.log("The math was a draw")
    }

    setCurrentLetter(isXCurrentPlayer ? O : X)
  }
  return (
    <StyledBoardSection>
      <span className='current_user'>Your Turn</span>

      {!playerWon ?
      <StyledTicTacToeBoard>

        {Object.keys(gameBoard).map((position, idx) => {
          if (typeof gameBoard[position] === "function") return false

          return (
            <TicTacToeCell
              position={position}
              key={idx}
              handleCellClicked={(e, position) => handleCellClicked(e, position, currentLetter)} />
          )
        })}

      </StyledTicTacToeBoard> :
      <StyledWinnerDisplay >
        <h2>Cyphermoon </h2>
        <span>won</span>
      </StyledWinnerDisplay>}

      <span className='restart_game'>Restart Game</span>
    </StyledBoardSection>
  )
}

const StyledBoardSection = styled.section`
    --board-color:#f4f4f4;
    width:100%;
    text-align:center;
    max-width:400px;
    background-color:red;
    border-radius:20px;
    padding:1em .5em;

    & > * + *{
      margin-top:2em;
    }

    .current_user,
    .restart_game{
        display:block;
        color:var(--board-color);
        font-weight:500;
        font-size:.88rem;
    }
`

const StyledWinnerDisplay = styled.div`

    h2{
      color:white;
      font-weight:700;
      font-size:2rem;
    }
    span{
      color:white;
      font-size:.9rem;
      font-weight:300;
    }
`

const StyledTicTacToeBoard = styled.div`
    --cell-size: 80px;
    display:grid;
    grid-template-columns: repeat(3, var(--cell-size));
    grid-auto-rows:var(--cell-size);
    // place-items:center;
    place-content:center;
`



export default GameBoard