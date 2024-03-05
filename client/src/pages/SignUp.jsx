import { Button, Label, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 mx-auto max-w-3xl flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className=' text-4xl font-bold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to bg-pink-500 rounded-lg text-white'>
              Hsin&apos;s
            </span>
            Blog
          </Link>
          <p className='text-sm mt-5'>
            這裡是星星的部落格，你可以使用信箱及密碼或使用Google帳號登入
          </p>
        </div>
        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4 '>
            <div>
              <Label value='Your username' />
              <TextInput type='text' placeholder='Username' id='username' />
            </div>
            <div>
              <Label value='Your email' />
              <TextInput
                type='text'
                placeholder='name@company.com'
                id='email'
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput type='text' placeholder='Password' id='password' />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit'>
              註冊
            </Button>
            <div className='flex gap-2 text-sm mt-5'>
              <span>已有帳號?</span>
              <Link to='/sign-in' className='text-blue-500'>
                登入
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
