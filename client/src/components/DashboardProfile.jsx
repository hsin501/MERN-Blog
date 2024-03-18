import {
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
  ref,
} from 'firebase/storage';
import { useSelector } from 'react-redux';
import { Alert, Button, TextInput } from 'flowbite-react';
import { HiMail, HiUser, HiKey } from 'react-icons/hi';
import { useState, useRef, useEffect } from 'react';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashboardProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imgFile, setImgFile] = useState(null);
  const [imgFileUrl, setImgFileUrl] = useState(null);
  const filePickerRef = useRef();
  const [imgFileUploadProgess, setImgFileUploadProgess] = useState(null);
  const [imgFileUploadProgessError, setImgFileUploadProgessError] =
    useState(null);
  // console.log(imgFileUploadProgess, imgFileUploadProgessError);

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
    // console.log('uploadingImg');
    // console.log(imgFile.name);
    setImgFileUploadProgessError(null); // 清除上傳進度錯誤訊息
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
        console.error(error); // 輸出錯誤到控制台
      },
      () => {
        // 上傳完成後取得下載URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgFileUrl(downloadURL);
        });
      }
    );
  };

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>個人資料</h1>
      <form className='flex flex-col gap-4'>
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
        />
        {/* 電子郵件輸入框 */}
        <TextInput
          id='email'
          type='email'
          placeholder='email'
          icon={HiMail}
          defaultValue={currentUser.email}
        />
        {/* 密碼輸入框 */}
        <TextInput
          id='password'
          type='password'
          icon={HiKey}
          placeholder='password'
        />
        {/* 更新按鈕 */}
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
          更新
        </Button>
      </form>
      {/* 刪除帳戶和登出選項 */}
      <div className='text-red-500 flex justify-between mt-5'>
        <span>刪除帳戶</span>
        <span>登出</span>
      </div>
    </div>
  );
}
