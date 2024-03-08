import { Footer, FooterTitle } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { FaInstagramSquare, FaLine, FaFacebookSquare } from 'react-icons/fa';
import { ImMail } from 'react-icons/im';

export default function FooterComponent() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-8xl '>
        <div className='grid  sm:grid-cols-2'>
          <div className='mt-2  col-end-2 flex justify-center'>
            <Link
              to='/'
              className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'
            >
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to bg-pink-500 rounded-lg text-white'>
                Hsin&apos;s
              </span>
              Blog
            </Link>
          </div>
          <div className=' grid justify-between grid-cols-2 sm:grid-cols-3 mt-2'>
            <div className='mt-2 sm:mt-0 border-l border-teal-500 pl-2 border-opacity-50 '>
              <FooterTitle title='Qucick lick' />
              <Footer.LinkGroup col>
                <Footer.Link href='/'>Home</Footer.Link>
                <Footer.Link href='/about'>About</Footer.Link>
                <Footer.Link href='/projects'>Projects</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className='mt-2 sm:mt-0 border-l border-teal-500 pl-2 border-opacity-50 '>
              <Footer.Title title='follow me' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://github.com/hsin501'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href='https://www.linkedin.com/in/hsinhsin501'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  linkedin
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className='mt-2 sm:mt-0 border-l border-teal-500 pl-2 border-opacity-50 '>
              <Footer.Title title='Connection' />
              <Footer.LinkGroup col>
                <div className='  flex items-center'>
                  <a href='#'>
                    <FaFacebookSquare className='text-xl ' />{' '}
                  </a>
                  <Footer.Link
                    href='https://www.facebook.com/iamhsinhsin/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='grid col-span-2 '
                  >
                    <span>Facebook</span>
                  </Footer.Link>
                </div>

                <div className='  flex items-center'>
                  <a href='#'>
                    <FaInstagramSquare className='text-xl ' />{' '}
                  </a>
                  <Footer.Link
                    href='https://www.instagram.com/hsinhsin501?igsh=dncyaTFyNTJzOXZt'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='grid col-span-2 '
                  >
                    <span>Instagram</span>
                  </Footer.Link>
                </div>

                <div className='  flex items-center'>
                  <a href='#'>
                    <ImMail className='text-xl ' />{' '}
                  </a>
                  <Footer.Link
                    href='mailto:joanne45644@gmail.com'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='grid col-span-2 '
                  >
                    <span>E-mail</span>
                  </Footer.Link>
                </div>
                <div className='  flex items-center'>
                  <a href='#'>
                    <FaLine className='text-xl ' />
                  </a>
                  <Footer.Link
                    href='https://line.me/ti/p/jRQje96e3P'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='grid col-span-2 '
                  >
                    <span>LINE</span>
                  </Footer.Link>
                </div>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <div className=' '>
          <Footer.Divider />
          <div className='flex justify-center'>
            <Footer.Copyright
              href='/'
              by="hsin's Blog"
              year={new Date().getFullYear()}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
