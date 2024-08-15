import { useLayoutEffect, useRef } from 'react';
import Vector from './Vector';
import ScrollTrigger from 'gsap/ScrollTrigger';
import gsap from 'gsap';

function DrawSvg() {
  const svgRef = useRef(null);
  const ballRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
    // 在 DOM 更新後立即執行
    const element = svgRef.current;

    const svg = element.querySelector('.svg-path');

    //路徑的總長度
    const length = svg.getTotalLength();

    // 設置初始狀態
    //開始定位畫圖,在滾動前隱藏svg
    svg.style.strokeDasharray = length;
    svg.style.strokeDashoffset = length;

    //添加 gsap 動畫
    let t1 = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top center',
        end: 'bottom 20%',
        // markers: true,
        scrub: true,
        onUpdate: (self) => {
          // console.log(self);
          const draw = length * self.progress;
          svg.style.strokeDashoffset = length - draw;
        },
        onToggle: (self) => {
          if (self.isActive) {
            // console.log('isAct');
            ballRef.current.style.display = 'none';
          } else {
            // console.log('is notAct');
            ballRef.current.style.display = 'block';
          }
        },
      },
    });

    // ballRef動畫
    gsap.fromTo(
      ballRef.current,
      { transform: 'translateX(-50%) scale(0.5)' },
      {
        transform: 'translateX(-50%) scale(1)',
        duration: 1,
        repeat: -1,
        yoyo: true,
      }
    );

    return () => {
      if (t1) t1.kill();
    };
  }, []);

  return (
    <div
      className='absolute top-4 left-1/2 w-full h-full translate-x-[-50%]'
      ref={svgRef}
    >
      <div
        className='absolute top-0 left-1/2 translate-x-[-50%] w-6 h-6 rounded-3xl  bg-black'
        ref={ballRef}
      />
      <Vector width='100%' height='100%' />
    </div>
  );
}

export default DrawSvg;
