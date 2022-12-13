import { useEffect, useState } from 'react';
import openSocket from 'socket.io-client';
import axios from 'axios';
import {Board} from '../src/components/Board';
import './App.css';

function App() {
  const [lastPong, setLastPong] = useState(null);
  
  return (
    <div className="App">
      <div className='App-header'>Connect Four Game</div>      
      <Board />
    </div>
  );
}

export default App;
