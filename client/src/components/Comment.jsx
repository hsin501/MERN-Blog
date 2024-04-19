/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { FaHeart } from 'react-icons/fa';

export default function Comment({ comment, onLike }) {
  const [user, setUser] = useState({});
  console.log(user);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
      <div className='flex-shrink-0 mr-3'>
        <img
          className='w-10 h-10 rounded-full bg-gray-200'
          src={user.profilePicture}
          alt={user.name}
        />
      </div>
      <div className='flex-1 min-w-0'>
        <div className='flex items-center mb-1 justify-between '>
          <span className='text-sm font-bold mr-1 truncate'>
            {user ? `${user.username}` : '匿名留言'}
          </span>
          <span className='text-gray-500 text-xs'>
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className='text-gray-500 pb-2 break-words overflow-hidden'>
          {comment.content}
        </p>
        <div className='flex items-center pt-2 text-sm max-w-fit gap-2'>
          <button
            className={`${
              currentUser && comment.likes.includes(currentUser._id)
                ? 'text-red-400'
                : 'text-gray-400'
            } hover: ${
              currentUser && comment.likes.includes(currentUser._id)
                ? 'hover:text-gray-600'
                : 'hover:text-red-400'
            }`}
            type='button'
            onClick={() => onLike(comment._id)}
            title={
              currentUser && comment.likes.includes(currentUser._id)
                ? '取消喜歡'
                : '喜歡'
            }
          >
            <FaHeart className='text-base' />
          </button>
          <p>
            {comment.numberOfLikes > 0 &&
              comment.numberOfLikes +
                ' ' +
                (comment.numberOfLikes === 1 && '人喜歡')}
          </p>
        </div>
      </div>
    </div>
  );
}
