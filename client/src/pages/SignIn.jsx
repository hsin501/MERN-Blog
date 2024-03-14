import { useSelector } from 'react-redux';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  // const [errorMsg, setErrorMsg] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { loading, error: errorMsg } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      // return setErrorMsg('請輸入所有資料!');
      return dispatch(signInFailure('請輸入所有資料!'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        // return setErrorMsg(data.message);
        dispatch(signInFailure(data.message));
      }
      // setLoading(false);
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      // console.log('發生錯誤', error);
      // setErrorMsg('發生錯誤，請稍後再試!');
      // setLoading(false);
      dispatch(signInFailure(error.message));
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
          <h1 className='text-2xl mt-5 font-bold'>歡迎回來</h1>
          <p className='text-sm bold'>
            <br></br>請輸入信箱及密碼或使用Google進行登入
          </p>
        </div>
        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
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
                placeholder='********'
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
                  <span className='pl-3'>登入中...</span>
                </>
              ) : (
                '登入'
              )}
            </Button>
            <OAuth />
            <div className='flex gap-2 text-sm mt-5'>
              <span>還沒有帳號?</span>
              <Link to='/sign-up' className='text-blue-500'>
                前往註冊
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
