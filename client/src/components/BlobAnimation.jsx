import { useRef } from 'react';
import { gsap } from 'gsap';

const BlobAnimation = () => {
  const blobRef = useRef(null);
  const animationRef = useRef(null);

  const handleMouseEnter = () => {
    if (animationRef.current) {
      animationRef.current.kill(); // 停止之前的動畫
      animationRef.current = null;
    }
    animationRef.current = gsap.to(blobRef.current, {
      duration: 2,
      attr: {
        d: 'M421,320.5Q418,391,350.5,415.5Q283,440,221,424Q159,408,134,354.5Q109,301,69,235.5Q29,170,100,141.5Q171,113,231,65Q291,17,331,83Q371,149,397.5,199.5Q424,250,421,320.5Z',
      },
      repeat: -1,
      yoyo: true,
      ease: 'linear',
    });
  };

  const handleMouseLeave = () => {
    if (animationRef.current) {
      animationRef.current.kill(); // 停止動畫
      animationRef.current = null;

      // 將形狀恢復為初始狀態
      gsap.to(blobRef.current, {
        duration: 1,
        attr: {
          d: 'M452,322Q422,394,356,435Q290,476,220,450Q150,424,126,364Q102,304,66,237Q30,170,83.5,112Q137,54,212.5,43Q288,32,354,69.5Q420,107,451,178.5Q482,250,452,322Z',
        },
        ease: 'power1.out',
      });
    }
  };

  return (
    <div className='flex justify-center items-center cursor-pointer'>
      <img
        src='/me.png'
        alt='me'
        className='absolute object-cover h-80 z-10 pointer-events-none'
      />
      <div className='relative'>
        <svg
          viewBox='0 0 500 500'
          xmlns='http://www.w3.org/2000/svg'
          width='800'
          height='800'
          opacity='0.8'
          id='blobSvg'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            <linearGradient id='gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
              <stop
                offset='0%'
                style={{ stopColor: 'rgb(76, 161, 175)' }}
              ></stop>
              <stop
                offset='100%'
                style={{ stopColor: 'rgb(196, 224, 229)' }}
              ></stop>
            </linearGradient>
          </defs>
          <path
            id='blob'
            ref={blobRef}
            d='M452,322Q422,394,356,435Q290,476,220,450Q150,424,126,364Q102,304,66,237Q30,170,83.5,112Q137,54,212.5,43Q288,32,354,69.5Q420,107,451,178.5Q482,250,452,322Z'
            fill='url(#gradient)'
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default BlobAnimation;
