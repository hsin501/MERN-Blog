import './imageSlider.css';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function ImageSlider() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const sliderContainerRef = useRef(null);
  const { theme } = useSelector((state) => state.theme); // 提取主題狀態

  const slides = [
    {
      number: '01',
      title: 'Blog',
      desc: '部落格,React',
      image:
        'https://www.shutterstock.com/image-vector/simple-racing-start-number-01-260nw-2135058571.jpg',
    },
    {
      number: '02',
      title: '肥宅歡樂送',
      desc: '點餐系統,使用技術:',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3vGA49rjOHZoPInbjWkbxC119A24JHwsTGA&s',
    },
    {
      number: '03',
      title: 'Travel List',
      desc: 'Shinning the clouds',
      image:
        'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Zmxvd2Vyc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1296&q=60',
    },
    {
      number: '04',
      title: 'POPCORN',
      desc: 'in the wilderness',
      image:
        'https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8Zmxvd2Vyc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1296&q=60',
    },
    {
      number: '05',
      title: 'Give Me Money',
      desc: 'in the sunset',
      image:
        'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
    },
    {
      number: '06',
      title: '書贏由你來決定',
      desc: 'in the sunset',
      image:
        'https://www.shutterstock.com/image-illustration/06-classic-vintage-sport-jersey-260nw-1385962760.jpg',
    },
    {
      number: '07',
      title: 'Pizza Menu',
      desc: 'in the sunset',
      image: 'https://d6ce0no7ktiq.cloudfront.net/images/stickers/607.png',
    },
  ];

  const handleChangeSlide = (direction) => {
    if (direction === 'up') {
      setActiveSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    } else if (direction === 'down') {
      setActiveSlideIndex((prevIndex) =>
        prevIndex === 0 ? slides.length - 1 : prevIndex - 1
      );
    }
    console.log();
  };

  useEffect(() => {
    const sliderHeight = sliderContainerRef.current?.clientHeight || 0;
    document.querySelector('.left-slide').style.transform = `translateY(${
      activeSlideIndex * sliderHeight
    }px)`;
    document.querySelector('.right-slide').style.transform = `translateY(-${
      activeSlideIndex * sliderHeight
    }px)`;
  }, [activeSlideIndex]);

  return (
    <div
      className='slider-container relative overflow-hidden max-w-full h-screen box-border'
      ref={sliderContainerRef}
    >
      <div
        className='left-slide h-full w-3/5 absolute top-0 left-0 transition-transform duration-500 ease-in-out '
        style={{ top: `-${(slides.length - 1) * 100}vh` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              backgroundColor: theme === 'dark' ? '#303c4d' : '#eaeaea',
            }}
          >
            <div className='numb'>{slide.number}</div>
            <h1 className='f'>{slide.title}</h1>
            <p>{slide.desc}</p>
          </div>
        ))}
      </div>

      <div className='right-slide'>
        {[...slides].reverse().map((slide, index) => (
          <div
            key={index}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
            }}
          ></div>
        ))}
      </div>
      <div className='slider-navigation'>
        {[...slides].reverse().map((_, index) => (
          <div
            key={index}
            className={`nav-dot ${
              slides.length - 1 - index === activeSlideIndex ? 'active' : ''
            }`}
            onClick={() => setActiveSlideIndex(slides.length - 1 - index)}
          />
        ))}
      </div>
      <div className='action-buttons '>
        <button
          className='down-button slider-button'
          onClick={() => handleChangeSlide('down')}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='24'
            height='24'
          >
            <path
              fill='currentColor'
              d='M12 16.5l6-6-1.41-1.41L12 13.67l-4.59-4.58L6 10.5l6 6z'
            />
          </svg>
        </button>
        <button
          className='up-button slider-button'
          onClick={() => handleChangeSlide('up')}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='24'
            height='24'
          >
            <path
              fill='currentColor'
              d='M12 7.5l-6 6 1.41 1.41L12 10.33l4.59 4.58L18 13.5l-6-6z'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
