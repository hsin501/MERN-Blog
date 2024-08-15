import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import Spline from '@splinetool/react-spline';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  const [posts, setPosts] = useState([]);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  const nextScrollRef = useRef(null);
  const scrollNext = () => {
    nextScrollRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  useEffect(() => {
    gsap.set([textRef1.current, textRef2.current], { xPercent: 0 });

    gsap.fromTo(
      textRef1.current,
      { x: 100 },
      {
        x: 500,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'none',
        scrollTrigger: {
          trigger: textRef1.current,
          start: 'bottom center',
          end: 'top 5%',
          toggleActions: 'play pause resume pause',
        },
      }
    );
    gsap.fromTo(
      textRef2.current,
      { x: 100 },
      {
        x: 700,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'none',
        scrollTrigger: {
          trigger: textRef1.current,
          start: 'bottom center',
          end: 'top 5%',
          toggleActions: 'play pause resume pause',
        },
      }
    );
  }, []);

  return (
    <div className='w-full'>
      <div className='relative h-screen w-full bg-gray-100 flex flex-col'>
        <Spline scene='https://prod.spline.design/lyKcrZIm6-zw5dSy/scene.splinecode' />
        <div className='absolute right-0 bottom-0 p-4 md:right-12 md:bottom-28 lg:right-48 lg:bottom-40 '>
          <button
            className='px-6 py-3 bg-gray-600 bg-opacity-30 text-white font-semibold rounded-3xl shadow-md hover:bg-white hover:bg-opacity-30  hover:text-gray-500 transition duration-300'
            onClick={scrollNext}
          >
            start
          </button>
        </div>
      </div>
      <div
        className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'
        ref={nextScrollRef}
      >
        <h1 className='text-3xl font-bold'>歡迎來到我的程式世界</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
          這裡就像個魔法小屋，把學程式的點點滴滴都記錄下來。從網頁的基本架構開始，到讓網頁亮晶晶的色彩，再到讓網頁動起來的小技巧，我們一起慢慢學，邊做邊分享。用程式碼將我們的想像變成現實，每一天都能在這裡發現新魔法！和我一起從麻瓜變成魔法高手吧！
        </p>
        <Link
          to='/search'
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
        >
          查看所有文章
        </Link>
      </div>
      <div className='p-3 bg-amber-100 dark:bg-slate-700 h-48 overflow-hidden'>
        <h1 ref={textRef1} className='text-8xl font-bold whitespace-nowrap'>
          求職中 ...
        </h1>
        <p ref={textRef2} className='text-6xl font-bold whitespace-nowrap mt-3'>
          歡迎聯繫
        </p>
      </div>
      <div className='max-w-custom mx-auto p-3 flex flex-col gap-8 py-7 '>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6 '>
            <h2 className='text-2xl font-semibold text-center '>最新文章</h2>
            <div className='flex flex-wrap gap-4 justify-center'>
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  className='w-full px-4 md:w-1/3 '
                />
              ))}
            </div>
            <Link
              to={'./search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              查看所有文章
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
