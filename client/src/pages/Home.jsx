import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
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
      <div className='p-3 bg-amber-100 dark:bg-slate-700 h-48'>
        空一個banner
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
