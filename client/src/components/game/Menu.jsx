/* eslint-disable react/prop-types */
import './Menu.css';
function Menu({ onClick }) {
  return (
    <div className='Menu'>
      <button className='Button' onClick={onClick}>
        開始遊戲
      </button>
    </div>
  );
}

export default Menu;
