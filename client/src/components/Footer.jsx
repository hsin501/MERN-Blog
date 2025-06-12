import { Footer, FooterTitle } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { FaInstagramSquare, FaLine, FaFacebookSquare } from 'react-icons/fa';
import { ImMail } from 'react-icons/im';

export default function FooterComponent() {
  return (
    <Footer container className='border border-t-8 border-blue-300'>
      <div className='w-full max-w-8xl '>
        <div className='grid  sm:grid-cols-2'>
          <div className='mt-2  col-end-2 flex justify-center'>
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
                <span className='px-2 py-1 rounded-full bg-white/70 dark:bg-black/50 text-neutral-800 dark:text-neutral-100'>
                  Hsin&#39;s
                </span>
                <span className='ml-1 mr-2 '>Blog</span>
              </span>
            </Link>
          </div>
          <div className=' grid justify-between grid-cols-2 sm:grid-cols-3 mt-2'>
            <div className='mt-2 sm:mt-0 border-l border-blue-500 pl-2 border-opacity-50 '>
              <FooterTitle title='Qucick lick' />
              <Footer.LinkGroup col>
                <Footer.Link href='/'>Home</Footer.Link>
                <Footer.Link href='/about'>About</Footer.Link>
                <Footer.Link href='/projects'>Projects</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className='mt-2 sm:mt-0 border-l border-blue-500 pl-2 border-opacity-50 '>
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
            <div className='mt-2 sm:mt-0 border-l border-blue-500 pl-2 border-opacity-50 '>
              <Footer.Title title='Contact Us' />
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
