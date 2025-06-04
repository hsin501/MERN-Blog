import { useEffect, useRef, useState } from 'react';
import AppleLogo from '../../../public/apple_cartoon.png';

import useInterval from './hooks/useInterval.jsx';

const canvasX = 800;
const canvasY = 500;
const initialSnake = {
  snake: [
    [4, 10],
    [3, 10],
  ],
};
const initialApple = [14, 10];
const scale = 20;
const timeDelay = 150;

// eslint-disable-next-line react/prop-types
export default function SnakeGame({ onGameStart, onGameOver }) {
  const canvaRef = useRef(null);
  const [snake, setSnake] = useState(initialSnake.snake);
  const [apple, setApple] = useState(initialApple);
  const [direction, setDirection] = useState([0, -1]);
  const [delay, setDelay] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useInterval(() => {
    runGame();
  }, delay);

  useEffect(() => {
    if (onGameStart) {
      play();
    }
  }, [onGameStart]);

  useEffect(() => {
    window.addEventListener('keydown', changeDirection);
    return () => {
      window.removeEventListener('keydown', changeDirection);
    };
  }, []);

  useEffect(() => {
    let fruit = document.getElementById('fruitapple');

    if (canvaRef.current) {
      const canvas = canvaRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        // 蛇頭
        ctx.fillStyle = '#58BC9B';
        ctx.fillRect(snake[0][0], snake[0][1], 1, 1);

        // 蛇身
        ctx.fillStyle = '#537A6D';
        snake.slice(1).forEach(([x, y]) => ctx.fillRect(x, y, 1, 1));
        ctx.drawImage(fruit, apple[0], apple[1], 1.5, 1.5);
      }
    }
  }, [snake, apple, gameOver]);

  function play() {
    setSnake(initialSnake.snake);
    setApple(initialApple);
    setDirection([1, 0]);
    setDelay(timeDelay);
    setGameOver(false);
    setScore(0);
  }

  function checkCollection(head) {
    for (let i = 0; i < head.length; i++) {
      if (
        head[0] < 0 ||
        head[0] * scale >= canvasX ||
        head[1] < 0 ||
        head[1] * scale >= canvasY
      )
        return true;
    }
    for (const s of snake) {
      //蛇頭碰到蛇身
      if (head[0] === s[0] && head[1] === s[1]) return true;
    }
    return false;
  }

  function appleEaten(newSnake) {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      // 更新計分
      setScore(score + 1);

      // 生成新蘋果的位置 確保蘋果位置不會超出範圍
      let newAppleX, newAppleY;
      do {
        newAppleX = Math.floor(Math.random() * (canvasX / scale));
        newAppleY = Math.floor(Math.random() * (canvasY / scale));
      } while (
        newSnake.some(
          (segment) => segment[0] === newAppleX && segment[1] === newAppleY
        )
      );

      // 更新蘋果位置
      setApple([newAppleX, newAppleY]);
      return true;
    }
    return false;
  }

  //更新最高分数
  function handleSetScore() {
    const highScore = localStorage.getItem('snakeScore');
    if (score > highScore) {
      localStorage.setItem('snakeScore', JSON.stringify(score));
    }
  }

  function runGame() {
    const newSnake = [...snake];
    const newSnakeHead = [
      //根據方向更新蛇頭方向
      newSnake[0][0] + direction[0],
      newSnake[0][1] + direction[1],
    ];
    newSnake.unshift(newSnakeHead); //在新位置添加蛇頭
    if (checkCollection(newSnakeHead)) {
      setGameOver(true);
      setDelay(null);
      handleSetScore(); //更新最高分數
    }
    if (!appleEaten(newSnake)) {
      newSnake.pop(); //沒有吃到蘋果pop unshift 有吃到蘋果unshift(讓蛇身越來越長)
    }
    {
      setSnake(newSnake); //更新蛇的位置
    }
  }

  function changeDirection(e) {
    switch (e.keyCode) {
      case 37:
        setDirection([-1, 0]); //左
        break;
      case 38:
        setDirection([0, -1]); //上
        break;
      case 39:
        setDirection([1, 0]); //右
        break;
      case 40:
        setDirection([0, 1]); //下
        break;
    }
  }

  function closeModal() {
    setGameOver(false);
    onGameOver();
  }

  return (
    <div
      className='mt-10 outline-none'
      tabIndex='0'
      onKeyDown={(e) => {
        changeDirection(e);
      }}
    >
      <div className='border-2 rounded-lg border-gray-500'>
        <div className='flex items-center justify-between pt-3 pb-3 border-b-2 border-gray-300'>
          <h2 className='pl-10'>分數:{score}</h2>
          <h2 className='text-right pr-10'>
            最高分數:{localStorage.getItem('snakeScore')}
          </h2>
        </div>
        <img
          src={AppleLogo}
          alt='fruitapple'
          id='fruitapple'
          width='30'
          className='hidden'
        />
        <canvas
          className='playArea'
          ref={canvaRef}
          width={`${canvasX}px`}
          height={`${canvasY}px`}
        />
        {gameOver && (
          <div
            className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'
            onClick={closeModal}
          >
            <div
              className='bg-white p-5 rounded-lg'
              onClick={(e) => e.stopPropagation()}
            >
              <div className='text-center'>
                <h2 className='text-2xl mb-4'>遊戲結束</h2>
                <div className='flex justify-around px-4  gap-4'>
                  <button
                    className='px-4 py-2 bg-blue-500 text-white rounded-lg'
                    onClick={play}
                  >
                    重新開始
                  </button>
                  <button
                    className='px-4 py-2 bg-red-500 text-white rounded-lg'
                    onClick={closeModal}
                  >
                    結束遊戲
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
