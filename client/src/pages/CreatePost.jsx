import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getStorage, ref } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imgUploadProgress, setImgUploadProgress] = useState(null);
  const [imgUploadProgressError, setImgUploadProgressError] = useState(null);
  const [formData, setFormData] = useState({});
  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImgUploadProgressError('請選擇圖片');
        return;
      }
      setImgUploadProgressError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImgUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImgUploadProgressError('圖片上傳失敗');
          setImgUploadProgress(null);
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUploadProgress(null);
            setImgUploadProgressError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImgUploadProgressError('圖片上傳失敗');
      setImgUploadProgress(null);
      console.log(error);
    }
  };
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>新增文章</h1>
      <form className='flex flex-col gap-4 '>
        <div className='flex flex-col gap-4 sm:flex-row justify-between '>
          <TextInput
            type='text'
            placeholder='title'
            required
            id='title'
            className='flex-1'
          />
          <Select>
            <option value='uncategorized'>選擇分類</option>
            <option value='javascript'>Javascript</option>
            <option value='react'>React</option>
            <option value='nodejs'>Node.js</option>
            <option value='htmlcss'>HTML&CSS</option>
            <option value='java'>Java</option>
            <option value='vscodetools'>VScode小工具</option>
            <option value='other'>其他</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUploadImage}
            disabled={imgUploadProgress}
          >
            {imgUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imgUploadProgress}
                  text={`${imgUploadProgress || 0} %`}
                />
              </div>
            ) : (
              '上傳圖片'
            )}
          </Button>
        </div>
        {imgUploadProgressError && (
          <Alert color='failure'>{imgUploadProgressError}</Alert>
        )}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-scale-down'
          />
        )}

        <ReactQuill
          theme='snow'
          placeholder='寫點東西吧'
          className='h-72 mb-12'
          required
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          發佈
        </Button>
      </form>
    </div>
  );
}
