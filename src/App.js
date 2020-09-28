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

const Board = ({ squares, onClick }) => {
    const renderSquare = (i) => {
        return <Square
            value={ squares[i] }
            onClick={ () => onClick(i) }
        />;
    }

    return (
        <div>
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
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [nextPlayer, setNextPlayer] = useState('X');
    const [winner, setWinner] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);

    const status = winner ? 'Winner: ' + winner : `Next player: ${ nextPlayer }`;

    const handleClick = (i) => {
        const currentHistory = history.slice(0, currentStep + 1);
        const currentSquares = currentHistory.slice(-1)[0];

        if (currentSquares[i] || calculateWinner(currentSquares))
            return;

        const newSquares = currentSquares.slice();
        newSquares[i] = nextPlayer;

        setHistory(currentHistory.concat([newSquares]));
        setCurrentStep(currentHistory.length);
        setNextPlayer(nextPlayer === 'X' ? 'O' : 'X');
        setWinner(calculateWinner(newSquares));
    }

    const jumpTo = step => {
        setCurrentStep(step);
        setNextPlayer((step % 2) ? 'O' : 'X');
    }

    const moves = history.map((step, move) => {
        const description = move ? `Go to move #${ move }` : 'Go to game start';

        return (
            <li key={ move }>
                <button onClick={ () => jumpTo(move) }>{ description }</button>
            </li>
        )
    })

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={ history[currentStep] }
                    onClick={ i => handleClick(i) }
                />
            </div>

            <div className="game-info">
                <div>{ status }</div>
                <ol>{ moves }</ol>
            </div>
        </div>
    );
};

export default Game;