import RoadMap from '../components/RoadMap';
import BlobAnimation from '../components/BlobAnimation';
import MatterStars from '../components/MatterStars.jsx';

export default function About() {
  return (
    <div className='flex flex-col overflow-x-hidden'>
      <div className='relative flex flex-col-reverse md:flex-row justify-center items-center w-full min-h-screen dark:bg-slate-700 bg-slate-100 px-6 py-12 '>
        <div className='md:w-1/2 w-full text-base leading-relaxed md:pr-12 z-10 pointer-events-none'>
          <div className='absolute top-0 left-0 w-full h-full z-0 '>
            <MatterStars />
          </div>
          <h1 className='text-3xl font-bold mb-4 '>關於我</h1>
          <p className='mb-4 '>
            我來自影像與設計背景，對視覺表達與使用者體驗有高度敏銳度。
            轉向軟體開發後，持續透過自學與專案實作，累積前後端整合能力。
            我熱愛從零開始打造產品，重視功能與美感的融合，致力於在每一次開發中，創造實用且令人愉悅的互動體驗。
          </p>
          <p>目前正在尋找能持續學習、與團隊共創產品的開發職位。</p>
        </div>
        <div className=' md:w-1/3 mb-8 md:mb-0 flex justify-center z-10'>
          <BlobAnimation />
        </div>
      </div>
      <div>
        <RoadMap />
      </div>
    </div>
  );
}
