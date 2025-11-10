import './imageSlider.css';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FiExternalLink, FiPlayCircle } from 'react-icons/fi';

const slides = [
  {
    number: '01',
    title: 'HSINs Blog部落格 (MERN Stack)',
    desc: '全端部落格平台，網站擁有者可註冊、登入、發表文章（支援圖片上傳與分類），並對文章進行評論。此專案涵蓋了從前端到後端的完整開發流程與使用者驗證機制。',
    technologies: [
      'React',
      'Redux Toolkit',
      'React Router',
      'Tailwind CSS',
      'Flowbite',
      'React Quill',
      'GSAP',
      'Node.js',
      'Express',
      'MongoDB',
      'Mongoose',
      'JWT',
      'bcrypt',
      'Vite',
    ],
    image: '/projectimage/mernblog.png',
    imageStyle: {
      backgroundSize: 'cover',
      width: '80%',
      height: '90%',
      margin: 'auto',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    },
    demoType: 'website',
    url: 'https://mern-blog-bhud.onrender.com/',
    gitUrl: 'https://github.com/hsin501/MERN-Blog',
  },

  {
    number: '02',
    title: '書贏由你來決定',
    desc: '在資策會的團隊專案，一個綜合性電商平台。主要負責建構商品頁面、首頁視覺設計及輪播圖功能。此專案讓我熟悉了團隊 Git 工作流與跨職能協作模式。',
    technologies: [
      'HTML、CSS',
      'JavaScript',
      'SPRINGBOOT',
      'MS SQL',
      'JSP',
      'JQUERY',
      'BOOTSTRAP',
      'GIT',
    ],
    image: '/projectimage/winwin.png',
    imageStyle: {
      backgroundSize: 'contain',
      width: '90%',
      height: '90%',
      margin: 'auto',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    },
    demoType: 'video',
    url: 'https://github.com/davidhan85/finalproject',
    gitUrl: 'https://github.com/davidhan85/finalproject',
  },
  {
    number: '03',
    title: '蟲幻之地',
    desc: '為「蟲幻之地」品牌識別設計專案 標誌設計、名片設計與官方網站設計。部屬於 Netlify，並使用 Next.js 框架實現動態路由與響應式設計。',
    technologies: [
      'HTML、CSS',
      'JavaScript',
      'React',
      'Next.js',
      'Framer Motion',
      'Tailwind CSS',
      'netlify',
    ],
    image: '/projectimage/insect.png',
    imageStyle: {
      backgroundSize: 'cover',
      width: '90%',
      height: '90%',
      margin: 'auto',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    },
    demoType: 'website',
    url: 'https://insectlands.netlify.app/',
    gitUrl: 'https://insectlands.netlify.app/',
  },
  {
    number: '04',
    title: 'goodnight｜沉靜夜間護膚互動頁面',
    desc: '一個以夜間護膚品牌為主題的互動式網頁作品，結合 Three.js 實作的產品 3D 檢視、視差星空與雲層背景、滑動觸發的流星效果與輕量購物車。主打流暢的 3D 互動體驗與行動優化，採用懶載入與 scissor 渲染等效能優化技術。',
    technologies: ['Three.js', 'GSAP', 'Lenis', 'Vite', 'localStorage'],
    image: '/projectimage/goodnight.png',
    imageStyle: {
      backgroundSize: 'cover',
      width: '90%',
      height: '90%',
      margin: 'auto',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    },
    demoType: 'website',
    url: 'https://hsin501.github.io/goodnight/',
    gitUrl: 'https://github.com/hsin501/goodnight',
  },
  {
    number: '05',
    title: 'POPCORN',
    desc: '電影資訊搜索與評分應用。使用者可以搜索電影、查看詳細資訊及評分。此專案的核心在於串接IMDB電影資料庫 API，並有效地處理非同步請求與資料呈現。',
    technologies: ['HTML、CSS', 'JavaScript', 'React', 'REST API'],
    image: '/projectimage/popcorn.png',
    imageStyle: {
      backgroundSize: 'contain',
      width: '100%',
      height: '78%',
      margin: 'auto',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    },
    demoType: 'website',
    url: 'https://hsin501.github.io/POPCORN/',
    gitUrl: 'https://github.com/hsin501/POPCORN',
  },
  {
    number: '06',
    title: '肥宅歡樂送',
    desc: '模擬線上點餐流程的網站。此專案使用 React Context API 進行購物車全域狀態管理，並透過 CSS Module 實現元件化樣式。網站完整支援 RWD，確保在各種裝置上都有良好體驗。',
    technologies: [
      'HTML、CSS',
      'JavaScript',
      'React',
      'RWD',
      'Context API',
      'CSS Module',
    ],
    image: '/projectimage/ordering2.png',
    imageStyle: {
      backgroundSize: 'contain',
      width: '80%',
      height: '90%',
      margin: 'auto',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    },
    demoType: 'website',
    url: 'https://hsin501.github.io/Buger_ordering/',
    gitUrl: 'https://github.com/hsin501/Buger_ordering',
  },
  {
    number: '07',
    title: 'Give Me Money',
    desc: '幫助使用者輕鬆計算與追蹤多人帳務的 React 應用。其核心挑戰在於處理複雜的狀態邏輯，實現新增好友、分攤帳單，並精確計算出誰該給誰多少錢。',
    technologies: ['HTML、CSS', 'JavaScript', 'React'],
    image: '/projectimage/givememoney.png',
    imageStyle: {
      backgroundSize: 'cover',
      width: '80%',
      height: '90%',
      margin: 'auto',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    },
    demoType: 'website',
    url: 'https://hsin501.github.io/Give_Me_Money/',
    gitUrl: 'https://github.com/hsin501/Give_Me_Money',
  },
];
export default function ImageSlider() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(slides.length - 1);

  const sliderContainerRef = useRef(null);
  const { theme } = useSelector((state) => state.theme); // 提取主題狀態

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
              backgroundColor: theme === 'dark' ? '#1a202c' : '#f7fafc',
            }}
            className='w-full h-full flex items-center justify-center p-8 md:p-16'
          >
            <div className='max-w-lg w-full space-y-4 md:space-y-6'>
              {/* 專案編號 */}
              <div className='translate-z-0 text-8xl font-bold text-transparent  [-webkit-text-stroke:0.15rem_rgba(220,104,104,0.9)] dark:[-webkit-text-stroke:0.15rem_rgba(220,104,104,0.5)]'>
                {slide.number}
              </div>
              {/* 標題 */}
              <h1 className='text-3xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 '>
                {slide.title}
              </h1>
              {/* 詳細描述 */}
              <p className='text-base md:text-lg leading-relaxed text-gray-500 dark:text-gray-400'>
                {slide.desc}
              </p>
              {/* 技術標籤 */}
              <div className='flex flex-wrap gap-2 pt-2'>
                <span className='font-semibold text-gray-600 dark:text-gray-300'>
                  使用技術:
                </span>
                {slide.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className='px-3 py-1 text-sm rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {/* 專案連結按鈕 */}
              <div className='flex items-center gap-4 pt-4'>
                {slide.url && (
                  <a
                    href={slide.url || '#'}
                    target={slide.demoType === 'website' ? '_blank' : '_self'}
                    rel='noopener noreferrer'
                    className='px-6 py-3 font-semibold rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl'
                  >
                    查看專案
                    {slide.demoType === 'website' && (
                      <FiExternalLink className='inline-block align-middle ml-2' />
                    )}
                    {slide.demoType === 'video' && (
                      <FiPlayCircle className='inline-block align-middle ml-2' />
                    )}
                  </a>
                )}
                {slide.gitUrl && (
                  <a
                    href={slide.gitUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='px-6 py-3 font-semibold rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300'
                  >
                    GitHub 原始碼
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='right-slide'>
        {slides
          .slice()
          .reverse()
          .map((slide, index) => (
            <div
              key={index}
              className='w-full h-full flex items-center justify-center p-4 md:p-8'
            >
              <div
                className='image-container'
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease-in-out',
                  ...(slide.imageStyle || {}),
                }}
                onClick={() => slide.url && window.open(slide.url, '_blank')}
              ></div>
            </div>
          ))}
      </div>
      <div className='slider-navigation'>
        {slides.map((_, index) => (
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
