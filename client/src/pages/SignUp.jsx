import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (formData.username.length < 3 || formData.username.length > 20) {
    //   alert('用戶名長度需在3~20之間');
    //   return;
    // }
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMsg('請輸入所有資料!');
    }
    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        return setErrorMsg(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      // console.log('發生錯誤', error);
      setErrorMsg('發生錯誤，請稍後再試!');
      setLoading(false);
    }
  };
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
            這裡是星星的部落格，你可以使用信箱及密碼或使用Google帳號進行註冊
          </p>
        </div>
        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
            <div>
              <Label value='Your username' />
              <TextInput
                type='text'
                placeholder='輸入用戶名...'
                id='username'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='輸入信箱...'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='輸入密碼...'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>註冊中...</span>
                </>
              ) : (
                '註冊'
              )}
            </Button>
            <OAuth />
            <div className='flex gap-2 text-sm mt-5'>
              <span>已有帳號?</span>
              <Link to='/sign-in' className='text-blue-500'>
                登入
              </Link>
            </div>
            {errorMsg && (
              <Alert className='mt-5' color='failure'>
                {errorMsg}
              </Alert>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
