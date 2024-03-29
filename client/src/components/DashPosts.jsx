import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  // console.log(userPosts);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const categoryMap = {
    uncategorized: '未分類',
    javascript: 'JavaScript',
    react: 'React',
    nodejs: 'Node.js',
    htmlcss: 'HTML&CSS',
    java: 'Java',
    vscodetools: 'VScode小工具',
    other: '其他',
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700  dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>更新日期</Table.HeadCell>
              <Table.HeadCell className='whitespace-nowrap'>
                發佈圖片
              </Table.HeadCell>
              <Table.HeadCell>文章標題</Table.HeadCell>
              <Table.HeadCell>分類</Table.HeadCell>
              <Table.HeadCell>
                <span className='sr-only'>刪除</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className='sr-only'>編輯</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body key={post._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='font-medium text-gray-900 dark:text-white '
                      to={`/post/${post.slug}`}
                    />
                    <img
                      src={post.image}
                      alt={post.title}
                      className='w-20 h-10 object-cover bg-gray-500'
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='font-medium text-gray-900 dark:text-white'
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap'>
                    {categoryMap[post.category]}
                  </Table.Cell>
                  <Table.Cell>
                    <span className='font-medium text-red-500 hover:underline cursor-pointer whitespace-nowrap '>
                      刪除
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='text-teal-500 hover:underline cursor-pointer whitespace-nowrap'
                      to={`/update-post/${post._id}`}
                    >
                      <span>編輯</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>您還沒有發佈</p>
      )}
    </div>
  );
}
