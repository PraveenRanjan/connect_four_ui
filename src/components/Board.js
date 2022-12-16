import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import openSocket from 'socket.io-client';
import { Row } from './Row';

const serverUrl = 'http://localhost:4000';

export const Board = () => {
  const [boardData, setBoardData] = useState({});
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [newGame, setNewGame] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const socket = openSocket(serverUrl);
    socket.on('game', (data) => {
      if (data?.payload) {
        const { boardData } = data.payload;
        const { board, currentPlayer, gameOver, message } = boardData;
        setBoardData(boardData);
        setBoard(board);
        setCurrentPlayer(currentPlayer);
        setGameOver(gameOver);
        setMessage(message);
      }
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const triggerNewGame = useCallback(async () => {
    await axios.get(`${serverUrl}/game/new`);
  }, []);

  useEffect(() => {
    if (newGame) {
      triggerNewGame();
      setNewGame(false);
    }
  }, [newGame, triggerNewGame]);

  const playGame = async (c) => {
    await axios.post(`${serverUrl}/game/move`, {
      boardData,
      move: c,
    });
  };

  return (
    <div>
      <div className="button" onClick={() => setNewGame(true)}>
        Start New Game
      </div>
      <table>
        <thead></thead>
        <tbody>
          {board &&
            board.map((row, i) => (
              <Row key={i} row={row} playGame={playGame} />
            ))}
        </tbody>
      </table>

      <p className="message">{message}</p>
    </div>
  );
};
