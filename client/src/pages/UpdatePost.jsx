import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getStorage, ref } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imgUploadProgress, setImgUploadProgress] = useState(null);
  const [imgUploadProgressError, setImgUploadProgressError] = useState(null);
  const [formData, setFormData] = useState({});
  // console.log(formData);
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    try {
      const fetchPost = async () => {
        const encodedPostId = encodeURIComponent(postId);
        const res = await fetch(`/api/post/getposts?postId=${encodedPostId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);

          setFormData({
            ...data.posts[0],
            _id: data.posts[0]._id || data.posts[0].id || postId,
          });
        }
      };
      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

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
            setFormData((prev) => ({ ...prev, image: downloadURL }));
          });
        }
      );
    } catch (error) {
      setImgUploadProgressError('圖片上傳失敗');
      setImgUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/post/updatePost/${formData._id}/${currentUser._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('更新文章失敗');
    }
  };

  const toolbarOptions = [
    //編輯選項
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'link'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
    ['blockquote', 'code-block'],
    ['image'],
    ['clean'],
  ];
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>編輯文章</h1>
      <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between '>
          <TextInput
            type='text'
            placeholder='title'
            required
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            value={formData.title}
          />
          <Select
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
            value={formData.category}
          >
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
          value={formData.content}
          placeholder='寫點東西吧'
          className='h-72 mb-12'
          required
          modules={{ toolbar: toolbarOptions }}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, content: value }))
          }
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          更新文章
        </Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
