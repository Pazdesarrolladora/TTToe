import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TicTacToe from './TicTacToe.jsx';
import './App.css';

function App() {
  const [playerMode, setPlayerMode] = useState('');
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true);

  const handlePlayerModeSelect = (mode) => {
    setPlayerMode(mode);
  };

  const handlePlayer1NameChange = (event) => {
    setPlayer1Name(event.target.value);
  };

  const handlePlayer2NameChange = (event) => {
    setPlayer2Name(event.target.value);
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setShowStartButton(false);
  };

  if (playerMode === '') {
    return (
      <div className="container">
        <h2 className="text-center p-4">Seleccione el modo de juego:</h2>

        <div className="d-grid gap-2 col-6 mx-auto p-3">
          <button
            className="btn btn-dark btn-lg btn-block"
            onClick={() => handlePlayerModeSelect('1P')}
          >
            1 Player
          </button>

          <button
            className="btn btn-dark btn-lg btn-block"
            onClick={() => handlePlayerModeSelect('2P')}
          >
            2 Player
          </button>
        </div>
      </div>
    );
  }

      if (playerMode === '1P' && !gameStarted) {
      const showStartButton = player1Name.trim() !== '';
    return (
      <div className="container">
        <h2>Ingrese el nombre del jugador:</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Seras X"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={player1Name}
            onChange={handlePlayer1NameChange}
          />

          {showStartButton && (
            <button
              className="btn btn-dark btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={handleStartGame}
            >
              ¡Vamos a jugar!
            </button>
          )}
        </div>
        {gameStarted && (<TicTacToe player1Name={player1Name} player2Name="Gladys" />
        )}
      </div>
    );
  }

  if (playerMode === '2P' && !gameStarted) {
    const showStartButton = player1Name.trim() !== '' && player2Name.trim() !== ''; // Verifica si ambos nombres de jugadores están ingresados

    return (
      <div className="container">
        <h2>Ingrese los nombres de los jugadores:</h2>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Seras X"
            aria-label="Username"
            value={player1Name}
            onChange={handlePlayer1NameChange}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Seras O"
            aria-label="Server"
            aria-describedby="button-addon2"
            value={player2Name}
            onChange={handlePlayer2NameChange}
          />

          {showStartButton && (
            <button
              className="btn btn-dark btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={handleStartGame}
            >
              ¡Vamos a jugar!
            </button>
          )}
        </div>
        {gameStarted && (
          <TicTacToe player1Name={player1Name} player2Name={player2Name} />
        )}
      </div>
    );
  }

  if (gameStarted) {
    if (playerMode === '1P') {
      return <TicTacToe player1Name={player1Name} player2Name="Gladys" />;
    } else if (playerMode === '2P') {
      return <TicTacToe player1Name={player1Name} player2Name={player2Name} />;
    }
  }


  return null;
}


export default App;

