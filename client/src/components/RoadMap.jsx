import DrawSvg from './DrawSvg';
import InfoItem from './InfoItem';

function RoadMap() {
  return (
    <div className='min-h-screen w-full bg-blue-200 relative'>
      <h1 className='capitalize flex justify-center items-center text-3xl font-bold text-black dark:text-white m-auto border-b-2 border-black dark:border-white w-fit pt-8'>
        road
      </h1>

      <div className='w-3/4 h-[200vh] m-auto flex justify-center items-center relative overflow-hidden '>
        <DrawSvg />
      </div>
      <div className=''>
        <InfoItem />
      </div>
    </div>
  );
}

export default RoadMap;
