/* eslint-disable react/prop-types */

import Menu from '../game/Menu.jsx';
import Tetris from '../game/Tetris.jsx';
import { useGameOver } from '../../hooks/game/useGameOver.jsx';

function Game({ rows, columns }) {
  const [gameOVer, setGameOver, resetGameOver] = useGameOver();

  const start = () => {
    resetGameOver();
    console.log(`start game is ${gameOVer}`);
  };

  return (
    <div className='Game'>
      {gameOVer ? (
        <Menu onClick={start} />
      ) : (
        <Tetris rows={rows} columns={columns} setGameOver={setGameOver} />
      )}
    </div>
  );
}

export default Game;
