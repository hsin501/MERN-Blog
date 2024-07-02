/* eslint-disable react/prop-types */
import './GameMenu.css';

function Menu({ startGameHandler }) {
  return (
    <div className='Menu'>
      <button className='Button' onClick={startGameHandler}>
        開始遊戲
      </button>
    </div>
  );
}

export default Menu;
