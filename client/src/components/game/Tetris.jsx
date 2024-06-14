import Board from './Board';
import './Tetris.css';
import { useBoard } from '../../hooks/game/useBoard';

function Tetris({ rows, columns, setGameOver }) {
  const [board, setBoard] = useBoard({ rows, columns });
  return (
    <div>
      <Board board={board} />
    </div>
  );
}

export default Tetris;
