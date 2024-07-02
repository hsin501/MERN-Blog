import { useState } from 'react';
import Menu from '../components/game/GameMenu.jsx';
import SnakeGame from '../components/game/SnakeGame.jsx';

export default function NotFound() {
  const [startGame, setStartGame] = useState(false);
  const startGameHandler = () => {
    setStartGame(true);
  };

  return (
    <div>
      <div className='flex flex-col items-center my-8'>
        <h1 className='text-4xl p-2'>404 Not Found</h1>
        <p>若有任何疑問，請聯絡開發人員</p>
        {startGame ? (
          <SnakeGame />
        ) : (
          <Menu startGameHandler={startGameHandler} />
        )}
      </div>
    </div>
  );
}
