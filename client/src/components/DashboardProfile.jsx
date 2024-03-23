import {
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
  ref,
} from 'firebase/storage';
import { useSelector } from 'react-redux';
import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import {
  HiMail,
  HiUser,
  HiKey,
  HiOutlineExclamationCircle,
} from 'react-icons/hi';
import { useState, useRef, useEffect } from 'react';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashboardProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imgFile, setImgFile] = useState(null);
  const [imgFileUrl, setImgFileUrl] = useState(null);
  const filePickerRef = useRef();
  const [imgFileUploadProgess, setImgFileUploadProgess] = useState(null);
  const [imgFileUploadProgessError, setImgFileUploadProgessError] =
    useState(null);
  // console.log(imgFileUploadProgess, imgFileUploadProgessError);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [imgFileUploading, setImgFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 圖片更換
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgFile(file);
      setImgFileUrl(URL.createObjectURL(file));
    }
  };
  // console.log(imgFile, imgFileUrl);

  //圖片上傳功能
  useEffect(() => {
    if (imgFile) {
      uploadImg(); // 呼叫上傳圖片的函式
    }
  }, [imgFile]);

  // 上傳圖片的函式
  const uploadImg = async () => {
    setImgFileUploadProgessError(null); // 清除上傳進度錯誤訊息
    setImgFileUploading(true); // 開啟上傳中的狀態
    // console.log('uploadingImg');
    // console.log(imgFile.name);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imgFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imgFile);

    // 監聽上傳狀態
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgFileUploadProgess(progess.toFixed(0)); // 更新上傳進度
      },
      (error) => {
        setImgFileUploadProgessError('無法上傳圖片(圖片需小於2MB)'); // 設置上傳錯誤訊息
        setImgFileUploadProgess(null); // 清除上傳進度
        setImgFile(null); // 清除選擇的圖片檔案
        setImgFileUrl(null); // 清除圖片URL
        setImgFileUploading(false); // 關閉上傳中的狀態
        console.error(error);
      },
      () => {
        // 上傳完成後取得下載URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImgFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('沒有任何修改');
      return;
    }
    if (imgFileUploading) {
      setUpdateUserError('圖片正在上傳中，請稍後再試');
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(res);
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess('成功更新');
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };
  // console.log(formData);

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>個人資料</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='file'
          accept='image/*'
          onChange={handleImgChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => {
            filePickerRef.current.click();
          }}
        >
          {/* 顯示上傳進度 */}
          {imgFileUploadProgess && (
            <CircularProgressbar
              value={imgFileUploadProgess || 0}
              text={`${imgFileUploadProgess}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imgFileUploadProgess / 100})`,
                },
              }}
            />
          )}
          {/* 顯示圖片 */}
          <img
            src={imgFileUrl || currentUser.profilePicture}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8  border-[lightgray]' ${
              imgFileUploadProgess && imgFileUploadProgess < 100 && 'opacity-60'
            }`}
          />
        </div>
        {/* 顯示上傳圖片錯誤訊息 */}
        {imgFileUploadProgessError && (
          <Alert color='failure'>{imgFileUploadProgessError}</Alert>
        )}
        {/* 使用者名稱輸入框 */}
        <TextInput
          id='username'
          type='text'
          placeholder='username'
          icon={HiUser}
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        {/* 電子郵件輸入框 */}
        <TextInput
          id='email'
          type='email'
          placeholder='email'
          icon={HiMail}
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        {/* 密碼輸入框 */}
        <TextInput
          id='password'
          type='password'
          icon={HiKey}
          placeholder='password'
          onChange={handleChange}
        />
        {/* 更新按鈕 */}
        <Button
          type='submit'
          gradientDuoTone='purpleToBlue'
          outline
          disabled={loading || imgFileUploading}
        >
          {loading ? '更新中...' : '更新'}
        </Button>
        {currentUser.isAdmin && (
          <Link to={'create-post'}>
            <Button
              type='button'
              gradientDuoTone='purpleToPink'
              className='w-full'
            >
              添加文章
            </Button>
          </Link>
        )}
      </form>
      {/* 刪除帳戶和登出選項 */}
      <div className='text-red-500 flex justify-between mt-5'>
        <span
          onClick={() => {
            setShowModal(true);
          }}
          className='cursor-pointer'
        >
          刪除帳戶
        </span>
        <span onClick={handleSignout} className='cursor-pointer'>
          登出
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className='mt-5 '>
          {updateUserSuccess}
        </Alert>
      )}

      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}

      {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
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
              確定要刪除此帳戶嗎?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
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
