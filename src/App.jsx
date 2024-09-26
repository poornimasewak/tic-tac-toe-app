import React, { useState } from 'react';
import Confetti from 'react-confetti';
import './App.css';

function Square(props) {
  return (
    <button className={`square ${props.isWinning ? 'winner' : ''}`} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo?.winner;
  const winningSquares = winnerInfo?.line || [];

  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (winner || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => handleClick(i)}
        isWinning={winningSquares.includes(i)}
      />
    );
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (!squares.includes(null)) {
    status = 'Draw!';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game-board">
      {winner && <Confetti />}
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      {winner && <button onClick={() => setSquares(Array(9).fill(null))}>Play Again</button>}
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      <Board />
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

export default Game;
