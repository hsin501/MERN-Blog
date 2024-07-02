import { useCallback, useEffect, useRef, useState } from 'react';

const canvasX = 1000;
const canvasY = 1000;
const initialSnake = {
  snake: [
    [4, 10],
    [4, 10],
  ],
};
const initialApple = [14, 10];
const scale = 50;
const timeDelay = 100;

export default function SnakeGame() {
  const canvaRef = useRef(null);
  const [snake, setSnake] = useState(initialSnake);
  const [apple, setApple] = useState(initialApple);
  const [direction, setDirection] = useState('right');
  const [delay, setDelay] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  return (
    <div>
      <div></div>
    </div>
  );
}
