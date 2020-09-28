import React, { useState } from 'react';

const calculateWinner = squares => {
    const winnerLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < winnerLines.length; i++) {
        const [a, b, c] = winnerLines[i];

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
            return squares[a];
    }

    return null;
}

const Square = ({ value, onClick }) => {
    return (
        <button className="square" onClick={ onClick }>
            { value }
        </button>
    );
}

const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [nextPlayer, setNextPlayer] = useState('X');
    const [winner, setWinner] = useState(null);

    const handleClick = (i) => {
        const newSquares = squares.slice();

        if (squares[i] || winner)
            return;

        newSquares[i] = nextPlayer;

        setSquares(newSquares);
        setNextPlayer(nextPlayer === 'X' ? 'O' : 'X');

        setWinner(calculateWinner(newSquares));
    }

    const renderSquare = (i) => {
        return <Square
            value={ squares[i] }
            onClick={ () => handleClick(i) }
        />;
    }

    const status = winner ? 'Winner: ' + winner : `Next player: ${ nextPlayer }`;

    return (
        <div>
            <div className="status">{ status }</div>
            <div className="board-row">
                { renderSquare(0) }
                { renderSquare(1) }
                { renderSquare(2) }
            </div>
            <div className="board-row">
                { renderSquare(3) }
                { renderSquare(4) }
                { renderSquare(5) }
            </div>
            <div className="board-row">
                { renderSquare(6) }
                { renderSquare(7) }
                { renderSquare(8) }
            </div>
        </div>
    )
}

const Game = () => {
    return (
        <div className="game">
            <div className="game-board">
                <Board/>
            </div>

            <div className="game-info">
                <div>{/* status */ }</div>
                <ol>{/* TODO */ }</ol>
            </div>
        </div>
    );
};

export default Game;