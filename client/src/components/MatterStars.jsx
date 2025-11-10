// src/components/MatterStars.jsx

import { useEffect, useRef, useState } from 'react';
import * as Matter from 'matter-js';

// 1. --- 星星圖片 ---
const STAR_TEXTURES = [
  '/stars/star1.png',
  '/stars/star2.png',
  '/stars/star3.png',
  '/stars/star4.png',
  '/stars/star5.png',
  '/stars/star6.png',
  '/stars/star7.png',
  '/stars/star8.png',
  '/stars/star9.png',
  '/stars/star10.png',
  '/stars/star11.png',
  '/stars/star12.png',
];

export default function MatterStars() {
  const containerRef = useRef(null);
  const engineRef = useRef(Matter.Engine.create());
  const bodiesRef = useRef([]); // 用來存放 Matter.js 的物理體

  // 這個 state 用來驅動 React 重新渲染 DOM 元素
  const [stars, setStars] = useState([]);

  // 初始化物理世界
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const engine = engineRef.current;
    engine.world.gravity.y = 0.7; // 設定重力

    // 2. --- 創建邊界 (隱形的地板和牆壁) ---
    const ground = Matter.Bodies.rectangle(
      container.clientWidth / 2, // X: 畫面水平正中間
      container.clientHeight + 40, // Y: 畫面底下 ?px 外
      container.clientWidth, // 寬度 = 整個畫面寬
      100, // 高度 = 100px
      { isStatic: true, render: { visible: false } }
    );
    const leftWall = Matter.Bodies.rectangle(
      -50, // X: 在畫面左邊界外 50px
      container.clientHeight / 2, // Y: 垂直置中
      100,
      container.clientHeight,
      { isStatic: true, render: { visible: false } }
    );
    const rightWall = Matter.Bodies.rectangle(
      container.clientWidth + 50,
      container.clientHeight / 2,
      100,
      container.clientHeight,
      { isStatic: true, render: { visible: false } }
    );

    // 3. 創建右邊的山丘，用來形成凹陷的右邊緣
    const rightHill = Matter.Bodies.circle(
      container.clientWidth * (2 / 3) + 150, // X: 放在最右邊
      container.clientHeight - 500, // Y: 和左山丘一樣高
      320, // 半徑

      { isStatic: true, render: { visible: false } }
    );
    Matter.World.add(engine.world, [ground, leftWall, rightWall, rightHill]);

    // 3. --- 一次性創建所有星星的物理體 ---
    const initialBodies = [];
    const initialStars = STAR_TEXTURES.flatMap((texture, textureIndex) =>
      // 每一種貼圖都創建?個
      [...Array(6).keys()].map((i) => {
        const scale = 0.6 + Math.random() * 0.8;
        const radius = 40 * scale;
        const x = Math.random() * container.clientWidth;
        const y = -100 - (textureIndex * 10 + i) * 30; // 確保初始位置不重疊

        const body = Matter.Bodies.circle(x, y, radius, {
          density: 0.05, // 密度，影響重量
          restitution: 0.4, // 彈性, 影響反彈高度
          friction: 0.2, // 摩擦力, 影響滑動速度
          // inertia: Infinity, // 防止亂轉
          frictionAir: 0.02, // 空氣阻力, 影響移動速度
        });
        // 隨機初始旋轉與角速度
        Matter.Body.setAngle(body, Math.random() * Math.PI * 2);
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);
        initialBodies.push(body);

        return {
          id: `star-${textureIndex}-${i}`,
          texture: texture,
          scale: scale,
          x: x,
          y: y,
          angle: body.angle,
        };
      })
    );

    bodiesRef.current = initialBodies;
    setStars(initialStars);
    Matter.World.add(engine.world, initialBodies);

    // --- 4. 啟動物理更新循環 ---
    let animationFrameId;
    const update = () => {
      // 更新物理引擎
      Matter.Engine.update(engine, 1000 / 60);

      // 將物理世界的位置，同步到 React 的 state 中
      setStars((currentStars) =>
        currentStars.map((star, index) => {
          const body = bodiesRef.current[index];
          if (body) {
            return {
              ...star,
              x: body.position.x,
              y: body.position.y,
              angle: body.angle,
            };
          }
          return star;
        })
      );
      animationFrameId = requestAnimationFrame(update);
    };
    update();

    // --- 滑鼠拖動 ---
    const mouse = Matter.Mouse.create(container); // 目標是 container，不是 canvas
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        damping: 0.5,
        render: {
          visible: false, // 不需要 Matter.js 來渲染滑鼠，DOM 會處理
        },
      },
    });
    Matter.World.add(engine.world, mouseConstraint);
    // --- 滑鼠點擊噴飛 ---
    const handleClick = (event) => {
      const rect = container.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      bodiesRef.current.forEach((body) => {
        const dx = body.position.x - mouseX;
        const dy = body.position.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 如果滑鼠點擊在半徑 100 內就彈開
        if (distance < 100) {
          const forceMagnitude = 0.1 * body.mass; // 力量
          Matter.Body.applyForce(body, body.position, {
            x: (dx / distance) * forceMagnitude,
            y: (dy / distance) * forceMagnitude,
          });
        }
      });
    };
    container.addEventListener('mousedown', handleClick);

    // --- 6. 清理函式 ---
    return () => {
      container.removeEventListener('mousedown', handleClick);
      cancelAnimationFrame(animationFrameId);
      Matter.World.clear(engine.world);
      Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className='absolute top-0 left-0 w-full h-full overflow-hidden'
    >
      {stars.map((star) => {
        const size = 80 * star.scale;
        return (
          <img
            key={star.id}
            src={star.texture}
            alt='star'
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: `${size}px`,
              height: 'auto',
              transform: `
                translate(${star.x - size / 2}px, ${star.y - size / 2}px)
                rotate(${star.angle}rad)
              `,
              transformOrigin: 'center center',
              userSelect: 'none',
              objectFit: 'contain',
              pointerEvents: 'auto',
              cursor: 'grab',
            }}
          />
        );
      })}
    </div>
  );
}
