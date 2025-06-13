/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const stylesBySize = {
  //預設樣式
  base: {
    link: 'rounded-full text-xs sm:text-base ',
    hsinSpan: 'px-2 py-1 rounded-2xl bg-white/70 dark:bg-black/50 opacity-80',
    blogSpan: 'ml-1 mr-2',
    gradientSize: 'w-24 h-24',
    gradientHoverSize: 'group-hover:w-40 group-hover:h-40',
  },

  //大尺寸樣式
  large: {
    link: 'rounded-bl-md text-2xl sm:text-3xl',
    hsinSpan:
      'px-4 py-6 rounded-full rounded-bl-none bg-white/80 dark:bg-black/70 opacity-80',
    blogSpan: 'ml-2 mr-4',
    gradientSize: 'w-52 h-52',
    gradientHoverSize: 'group-hover:w-40 group-hover:h-40',
  },
};

export default function LogoLink({ className = '', size = 'base' }) {
  const currentStyles = stylesBySize[size];
  return (
    <Link
      to='/'
      className={`
        group 
        relative 
        overflow-hidden 
        rounded-full 
        p-1 
        whitespace-nowrap font-semibold dark:text-white
        inline-flex
         items-center
        ${className} 
         ${currentStyles.link}
       
      `}
    >
      <div
        className='
      absolute inset-0 
      z-0 
      flex items-center justify-center
    '
      >
        <div
          className={`
        fancy-gradient      
        animate-effect            
        rounded-full
        blur-[20px]        
        opacity-60 
        transition-all duration-500 
        ${currentStyles.gradientSize}
        ${currentStyles.gradientHoverSize}    
      `}
        ></div>
      </div>

      <span
        className='relative z-10 flex items-center  transition-transform duration-300 
    group-hover:scale-105'
      >
        <span
          className={`${currentStyles.hsinSpan} text-neutral-800 dark:text-neutral-100 `}
        >
          Hsin&#39;s
        </span>
        <span className={currentStyles.blogSpan}>Blog</span>
      </span>
    </Link>
  );
}
