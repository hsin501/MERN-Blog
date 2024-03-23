import { Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function createPost() {
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
          <FileInput type='file' accept='image/*' />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
          >
            上傳圖片
          </Button>
        </div>
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
