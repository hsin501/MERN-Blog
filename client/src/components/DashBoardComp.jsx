import { Button, Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocument,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchWithAuth } from '../utils/fetchWithAuth';

export default function DashBoardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetchWithAuth('/api/user/getusers?limit=5');
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.userTotal);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetchWithAuth('/api/post/getposts?limit=5');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.total);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetchWithAuth('/api/comment/getcomments?limit=5');
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        // console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <div className='p-3 md:mx-auto mt-10'>
      <div className='flex-wrap flex gap-4 justify-center'>
        <div className='flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md dark:bg-slate-800'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md'>總用戶</h3>
              <p className='text-2xl'>{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className='bg-teal-500 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className='text-gray-500'>上個月</div>
          </div>
        </div>
        <div className='flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md dark:bg-slate-800'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md'>總評論</h3>
              <p className='text-2xl'>{totalComments}</p>
            </div>
            <HiAnnotation className='bg-indigo-500 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className='text-gray-500'>上個月</div>
          </div>
        </div>
        <div className='flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md dark:bg-slate-800'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md'>總文章</h3>
              <p className='text-2xl'>{totalPosts}</p>
            </div>
            <HiDocument className='bg-lime-700 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className='text-gray-500'>上個月</div>
          </div>
        </div>
      </div>
      <div className='grid md:grid-cols-3 sm:grid-cols-1 gap-4 pt-8'>
        <div className='flex flex-col w-full  shadow-md p-2 rounded-md dark:bg-gray-800 '>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>最近用戶</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={'/dashboard?tab=users'}>顯示全部</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>用戶頭像</Table.HeadCell>
              <Table.HeadCell>用戶名</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id} className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt='user'
                        className='w-10 h-10 rounded-full bg-gray-500'
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className='flex flex-col w-full  shadow-md p-2 rounded-md dark:bg-gray-800  '>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>最近評論</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={'/dashboard?tab=comments'}>顯示全部</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>評論內容</Table.HeadCell>
              <Table.HeadCell>喜歡</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.map((comment) => (
                <Table.Body key={comment._id} className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell className='w-96'>
                      <p className='break-all h-10 overflow-hidden'>
                        {comment.content}
                      </p>
                    </Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className='flex flex-col w-full  shadow-md p-2 rounded-md dark:bg-gray-800  '>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>最近文章</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={'/dashboard?tab=posts'}>顯示全部</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>文章圖片</Table.HeadCell>
              <Table.HeadCell>文章標題</Table.HeadCell>
              <Table.HeadCell>文章分類</Table.HeadCell>
            </Table.Head>
            {posts &&
              posts.map((post) => (
                <Table.Body key={post._id} className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      <img
                        src={post.image}
                        alt='user'
                        className='w-14 h-10 rounded-md bg-gray-500'
                      />
                    </Table.Cell>
                    <Table.Cell className='w-78'>{post.title}</Table.Cell>
                    <Table.Cell className='w-5'>{post.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
