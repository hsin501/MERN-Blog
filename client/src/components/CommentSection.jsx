import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Comment from './Comment';

// eslint-disable-next-line react/prop-types
export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState('');
  const [comments, setComments] = useState([]);
  // console.log(comments);

  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      // eslint-disable-next-line no-unused-vars
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: 'PUT',
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((cmt) =>
            cmt._id === commentId
              ? {
                  ...cmt,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : cmt
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      <hr className='h-0.5 my-6 bg-gray-300 border-0 dark:bg-gray-600 rounded' />
      {currentUser ? (
        <div className='flex justify-center'>
          <div className='text-gray-500 text-sm  flex items-center flex-col mr-4'>
            <img
              className='h-14 w-14 object-cover rounded-2xl mb-2'
              src={currentUser.profilePicture}
              alt=''
            />
            <Link to={'/dashboard?tab=profile'}>{currentUser.username}</Link>
          </div>

          <div className='flex justify-center items-center border-l-2 border-gray-300 dark:border-gray-600 rounded'></div>
          {currentUser && (
            <div className='flex-1'>
              <form className='ml-6' onSubmit={handleSumbit}>
                <Textarea
                  className=''
                  placeholder='請輸入您的評論...'
                  rows='3'
                  maxLength='200'
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />
                <div className=' flex justify-between mt-2'>
                  <p className='text-gray-500 text-sm flex'>
                    剩餘{200 - comment.length}個字
                  </p>
                  <Button outline gradientDuoTone='purpleToBlue' type='sumbit'>
                    送出
                  </Button>
                </div>
              </form>
              {commentError && (
                <Alert color='failure' className='mt-5'>
                  {commentError}
                </Alert>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className='text-sm text-teal-500 my-5'>
          您必須登入才能評論，
          <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
            登入
          </Link>
        </div>
      )}
      {comments.length === 0 ? (
        <div>
          <p className='text-sm'>沒有評論</p>
        </div>
      ) : (
        <>
          <div className='text-sm mt-7 mb-5 flex items-center gap-1'>
            <p>評論</p>
            <div className='border border-gray-400 py-1 px-2 rounded-md'>
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
            />
          ))}
        </>
      )}
    </div>
  );
}
