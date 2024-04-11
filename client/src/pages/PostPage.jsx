import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Spinner } from 'flowbite-react';

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  // console.log(post);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    // console.log(postSlug);
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setReadingTime(calculateReadingTime(data.posts[0].content));
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  const calculateReadingTime = (htmlContent) => {
    const textContent = htmlContent.replace(/<[^>]*>/g, '').trim();
    const words = textContent.length;
    const wordsPerMinute = 400; // 根據用戶可調整每分鐘閱讀的速度
    const readingTime = Math.ceil(words / wordsPerMinute);
    return readingTime;
  };

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner aria-label='Extra large spinner example' size='lg' />
      </div>
    );

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post && post.title}
      </h1>
      <Link
        to={`search?category=${post && post.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs'>
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-10 p-3 max-h-96 h-auto w-auto mx-auto object-cover'
      />
      <div className='flex justify-between p-3 border-b border-slate-300 mx-auto w-full max-w-2xl text-xs'>
        <span className='italic'>
          {post && new Date(post.createdAt).toLocaleDateString()}
        </span>
        <span>閱讀時間{readingTime}分鐘</span>
      </div>
      <div
        className='p-3 max-w-2xl mx-auto w-full ql-container ql-editor post-content'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
    </main>
  );
}
