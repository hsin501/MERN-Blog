import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { PiMoonFill, PiSunFill } from 'react-icons/pi';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';

export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  // console.log(searchTerm);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className='border-b-2 '>
      <Link
        to='/'
        className='
    group 
    relative 
    overflow-hidden 
    rounded-full 
    p-1 
    self-center whitespace-nowrap text-xs sm:text-base font-semibold dark:text-white
    
  '
      >
        <div
          className='
      absolute inset-0 
      z-0 
      flex items-center justify-center
    '
        >
          <div
            className='
        fancy-gradient      
        animate-effect      
        w-24 h-24          
        rounded-full
        blur-[20px]        
        opacity-50       
        transition-all duration-500 
        group-hover:w-40 group-hover:h-40 
        group-hover:opacity-75      
      '
          ></div>
        </div>

        <span
          className='relative z-10 flex items-center  transition-transform duration-300 
    group-hover:scale-105'
        >
          <span className='px-2 py-1 rounded-full bg-white/70 dark:bg-black/50 text-neutral-800 dark:text-neutral-100 '>
            Hsin&#39;s
          </span>
          <span className='ml-1 mr-2 '>Blog</span>
        </span>
      </Link>
      <Navbar.Collapse>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/search'} as={'div'}>
          {' '}
          <Link to='/search'>BLOG</Link>
        </Navbar.Link>
      </Navbar.Collapse>
      <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='搜尋...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline '
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button
          className='w-12 h-10 hidden sm:inline'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <PiSunFill /> : <PiMoonFill />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>個人資料</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>登出</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-up'>
            <Button gradientDuoTone='purpleToBlue' pill>
              註冊
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}
