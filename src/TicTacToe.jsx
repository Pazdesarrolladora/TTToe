import React, { useState } from 'react';
import './TicTacToe.css';
import { BiHappyAlt } from 'react-icons/bi';


function TicTacToe({ player1Name, player2Name }) {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);
  const [player1Points, setPlayer1Points] = useState(0);
  const [player2Points, setPlayer2Points] = useState(0);

  const handleCellClick = (index) => {
    if (!board[index] && !winner && !draw) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      board[index] = currentPlayer
      setBoard(newBoard);
  
      checkWinner(newBoard, currentPlayer);
      checkDraw(newBoard);
  
      if (player2Name === 'Gladys' && currentPlayer === 'X' && !winner && !draw) {
        setTimeout(() => {
          computerMove();
        }, 500);
      } else {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
    }
  };
  
  const computerMove = () => {
    const emptyCells = board.reduce((acc, cell, index) => {
      if (!cell) {
        acc.push(index);
      }
      return acc;
    }, []);
  
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const computerIndex = emptyCells[randomIndex];
  
    const newBoard = [...board];
    newBoard[computerIndex] = 'O';
  
    setCurrentPlayer('X');
    setBoard(newBoard);
  
    checkWinner(newBoard, 'O');
    checkDraw(newBoard);
  };
  
  
  
  

  const checkWinner = (board, player) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] === player && board[b] === player && board[c] === player) {
        setWinner(player);
        updatePoints(player);
        break;
      }
    }
  };

  const checkDraw = (board) => {
    if (board.every(cell => cell !== '') && !winner) {
      setDraw(true);
    }
  };

 
  const updatePoints = (player) => {
    if (player === 'X') {
      setPlayer1Points(player1Points + 1);
    } else if (player === 'O') {
      setPlayer2Points(player2Points + 1);
    }
  };


  const handleRestart = () => {
    location.reload();
  };

  const handleRevancha = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setWinner(null);
    setDraw(false);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <div className="tictactoe">
            <div className="board">
              {board.map((cell, index) => (
                <div
                  className="cell"
                  key={index}
                  onClick={() => handleCellClick(index)}
                >
                  {cell}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card mt-4">
            <div className="card-body">
              <h4 className="card-title text-center">PUNTAJES</h4>
              <p className="card-text text-center fw-bold">
                {player1Name} {player1Points}
              </p>
              <p className="card-text text-center fw-bold">
                {player2Name} {player2Points}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="resultado text-center p-3">
            <p className='display-4'>
              {winner && (
                <p className='display-4'>¡{winner === 'X' ? player1Name : player2Name} ha ganado <BiHappyAlt/>!</p>
              )}
              {draw && <p>¡Empate!</p>}
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="d-grid gap-2 col-6 mx-auto p-3">
            <button
              className="btn btn-dark btn-lg btn-block"
              onClick={handleRevancha}
            >
              Revancha
            </button>

            <button
              className="btn btn-dark btn-lg btn-block"
              onClick={handleRestart}
            >
              Reiniciar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default TicTacToe;