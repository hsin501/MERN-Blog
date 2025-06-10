import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import { useState, useMemo, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import { getStorage, ref } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import QuillTableBetter from 'quill-table-better';
import 'react-quill-new/dist/quill.snow.css';
import 'quill-table-better/dist/quill-table-better.css';

const BlockEmbed = Quill.import('blots/block/embed');
class IframeBlot extends BlockEmbed {
  static create(value) {
    const node = super.create();
    // 傳入的 value 就是 src 網址
    node.setAttribute('src', value);
    // 設定 CodePen 需要的 iframe 屬性
    node.setAttribute('style', 'width: 100%; height: 300px;');
    node.setAttribute('scrolling', 'no');
    node.setAttribute('frameborder', 'no');
    node.setAttribute('loading', 'lazy');
    node.setAttribute('allowtransparency', 'true');
    node.setAttribute('allowfullscreen', 'true');
    return node;
  }

  static value(domNode) {
    // 從 DOM 元素讀取 src 網址
    return domNode.getAttribute('src');
  }
}

// 註冊 Blot，讓 Quill 認識它
IframeBlot.blotName = 'iframe';
IframeBlot.tagName = 'iframe'; //直接建立 iframe 標籤
Quill.register(IframeBlot);
Quill.register(
  {
    'modules/table-better': QuillTableBetter,
  },
  true
);

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imgUploadProgress, setImgUploadProgress] = useState(null);
  const [imgUploadProgressError, setImgUploadProgressError] = useState(null);
  const [formData, setFormData] = useState({});
  // console.log(formData);
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const quillRef = useRef(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
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
      setPublishError('發表文章失敗');
    }
  };

  const handleInsertIframe = () => {
    const url = prompt('請貼上 CodePen 的 Embed SRC 網址：');
    if (url && quillRef.current) {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection(true);
      quill.insertEmbed(range.index, 'iframe', url, 'user');
    }
  };

  const quillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike', 'link'],
          [{ color: [] }, { background: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
          ['blockquote', 'code-block'],
          ['clean'],
          ['image'],
          ['iframeButton'],
          ['table-better'],
        ],

        handlers: {
          iframeButton: handleInsertIframe,
        },
      },
      table: false,
      'table-better': {
        language: 'en_US',
        menus: [
          'column',
          'row',
          'merge',
          'table',
          'cell',
          'wrap',
          'copy',
          'delete',
        ],
        toolbarTable: true,
        operationMenu: {
          items: {
            unmergeCells: { text: 'Unmerge cells' },
          },
          color: {
            colors: ['red', 'green', 'yellow', 'blue', 'white'],
            text: 'Background Colors:',
          },
        },
      },
      keyboard: {
        bindings: QuillTableBetter.keyboardBindings,
      },
    }),
    []
  );
  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'link',
    'color',
    'background',
    'list',
    'bullet',
    'indent',
    'align',
    'blockquote',
    'code-block',
    'image',
    'table',
    'iframe',
  ];

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>新增文章</h1>
      <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between '>
          <TextInput
            type='text'
            placeholder='title'
            required
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
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
          ref={quillRef}
          theme='snow'
          placeholder='寫點東西吧'
          className='h-72 mb-12'
          required
          modules={quillModules}
          formats={quillFormats}
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        {/* --- 新增: 自訂按鈕的樣式 (可選) --- */}
        <style>
          {`
            .ql-toolbar .ql-iframeButton::before {
              content: "🌐"; 
              font-weight: bold;
              font-size: 14px;
            }
          `}
        </style>
        <Button type='submit' gradientDuoTone='purpleToPink'>
          發佈
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
