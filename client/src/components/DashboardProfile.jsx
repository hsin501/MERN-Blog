import { useSelector } from 'react-redux';
import { Button, TextInput } from 'flowbite-react';

export default function DashboardProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>個人資料</h1>
      <form className='flex flex-col gap-4'>
        <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
          <img
            src={currentUser.profilePicture}
            alt='user'
            className='rounded-full w-full h-full object-cover border-8  border-[lightgray]'
          />
        </div>
        <TextInput
          id='username'
          type='text'
          placeholder='username'
          defaultValue={currentUser.username}
        />
        <TextInput
          id='email'
          type='email'
          placeholder='email'
          defaultValue={currentUser.email}
        />
        <TextInput id='password' type='password' placeholder='password' />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
          更新
        </Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span>刪除帳戶</span>
        <span>登出</span>
      </div>
    </div>
  );
}
