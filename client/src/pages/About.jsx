import RoadMap from '../components/RoadMap';
import BlobAnimation from '../components/BlobAnimation';

export default function About() {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-col-reverse md:flex-row justify-center items-center w-full min-h-screen bg-gray-200 px-6 py-12 '>
        <div className='md:w-1/2 w-full text-base leading-relaxed md:pr-12'>
          <h1 className='text-3xl font-bold mb-4'>關於我</h1>
          <p className='mb-4'>
            曾從事影像剪輯與接案工作，對畫面與使用者感受特別敏銳。2023
            年起開始投入網頁開發學習，喜歡把設計概念轉化為能互動的網站，尤其對動畫與
            3D 呈現特別有興趣。
          </p>
          <p>
            目前持續學習
            JavaScript、React、Three.js，並打造了多個作品，我希望做出那種，會讓人說一句：「這網頁也太酷了吧！」的作品。
          </p>
        </div>
        <div className=' md:w-1/3 w-full mb-8 md:mb-0 flex justify-center'>
          <BlobAnimation />
        </div>
      </div>
      <div className=''>
        <RoadMap />
      </div>
    </div>
  );
}
