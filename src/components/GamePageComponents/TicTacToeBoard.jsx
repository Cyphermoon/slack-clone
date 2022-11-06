import styled from '@emotion/styled'
import TicTacToeCell from './TicTacToeCell'
import React from 'react'

const TicTacToeBoard = ({ handleCellClicked, gameBoard }) => {
    return (
        <StyledTicTacToeBoard>
            {Object.keys(gameBoard).map((position, idx) => {
                if (typeof gameBoard[position] === "function") return false

                return (
                    <TicTacToeCell
                        position={position}
                        key={idx}
                        className={gameBoard[position]}
                        handleCellClicked={(e, position) => handleCellClicked(e, position)} />
                )
            })}

        </StyledTicTacToeBoard>
    )
}

const StyledTicTacToeBoard = styled.div`
    --cell-size: 80px;
    display:grid;
    grid-template-columns: repeat(3, var(--cell-size));
    grid-auto-rows:var(--cell-size);
    // place-items:center;
    place-content:center;
`


export default TicTacToeBoard