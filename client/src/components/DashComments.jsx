import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, Table } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  // console.log(userPosts);
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [commentIdToDelete, setCommentIdToDelete] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [expandedComments, setExpandedComments] = useState({});
  const toggleCommentExpansion = (id) => {
    setExpandedComments((prevExpandedComments) => ({
      ...prevExpandedComments,
      [id]: !prevExpandedComments[id],
    }));
  };
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700  dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>更新日期</Table.HeadCell>
              <Table.HeadCell>評論內容</Table.HeadCell>
              <Table.HeadCell className='whitespace-nowrap'>
                喜歡數量
              </Table.HeadCell>
              <Table.HeadCell>評論Id</Table.HeadCell>
              <Table.HeadCell className='whitespace-nowrap'>
                使用者Id
              </Table.HeadCell>
              <Table.HeadCell>
                <span className='sr-only'>刪除</span>
              </Table.HeadCell>
            </Table.Head>
            {comments.map((comment) => (
              <Table.Body key={comment._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell className='w-full px-2  break-words overflow-auto leading-relaxed max-w-[290px]'>
                    {expandedComments[comment._id] ? (
                      <>
                        <span>{comment.content}</span>
                        <br />
                        <button
                          onClick={() => toggleCommentExpansion(comment._id)}
                          className='text-blue-300 hover:underline ...'
                        >
                          顯示更少
                        </button>
                      </>
                    ) : (
                      <>
                        <span>{comment.content.slice(0, 20)}</span>
                        {comment.content.length > 100 && (
                          <>
                            <span>...</span>
                            <br />
                            <button
                              onClick={() =>
                                toggleCommentExpansion(comment._id)
                              }
                              className='text-blue-300 hover:underline ...'
                            >
                              閱讀更多
                            </button>
                            <br />
                          </>
                        )}
                      </>
                    )}
                  </Table.Cell>
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  <Table.Cell className='whitespace-nowrap'>
                    {comment.postId}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap'>
                    {comment.userId}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer whitespace-nowrap '
                    >
                      刪除
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              顯示更多
            </button>
          )}
        </>
      ) : (
        <p>沒有任何評論</p>
      )}
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              確定要刪除此評論嗎?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteComment}>
                {'是,我確定'}
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                不,取消
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
