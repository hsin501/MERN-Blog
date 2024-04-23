/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { FaHeart } from 'react-icons/fa';
import { Button, Textarea } from 'flowbite-react';

export default function Comment({ comment, onLike, onEdit }) {
  const [user, setUser] = useState({});
  // console.log(user);
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditContent] = useState(comment.content);

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

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(comment.content);
    // console.log(editedContent);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: editedContent }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
      <div className='flex-shrink-0 mr-3'>
        <img
          className='w-10 h-10 rounded-full bg-gray-200'
          src={user.profilePicture}
          alt={user.name}
        />
      </div>
      <div className='flex-1 min-w-0  '>
        <div className='flex items-center mb-1 justify-between  '>
          <span className='text-sm font-bold mr-1 truncate'>
            {user ? `${user.username}` : '匿名留言'}
          </span>
          <span className='text-gray-500 text-xs'>
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              className='mb-2'
              required
              rows={4}
              value={editedContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div className='flex justify-end gap-2 text-xs'>
              <Button
                type='button'
                size='sm'
                gradientDuoTone='purpleToBlue'
                onClick={handleSave}
              >
                儲存
              </Button>
              <Button
                type='button'
                size='sm'
                gradientDuoTone='purpleToBlue'
                outline
                onClick={() => setIsEditing(false)}
              >
                取消
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className='text-gray-500 pb-2 break-words overflow-hidden '>
              {comment.content}
            </p>

            <div className='flex items-center pt-2 text-sm gap-2  max-w-full '>
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
              <p className='whitespace-nowrap'>
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    ' ' +
                    (comment.numberOfLikes === 1 && '人喜歡')}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <div className=' flex justify-end w-full '>
                    <button
                      type='button'
                      className='text-gray-400  hover:text-blue-500'
                      onClick={handleEdit}
                    >
                      編輯
                    </button>
                  </div>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
