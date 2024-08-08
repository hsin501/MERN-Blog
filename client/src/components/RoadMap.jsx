import DrawSvg from './DrawSvg';

function RoadMap() {
  return (
    <div className='min-h-screen w-full bg-blue-300 relative'>
      <div className=''>
        <h1 className='capitalize flex justify-center items-center text-3xl font-bold text-black dark:text-white m-auto border-b-2 border-black dark:border-white w-fit pt-8'>
          自我介紹
        </h1>
      </div>
      <div className='w-3/4 h-[200vh] m-auto flex justify-center items-center relative'>
        <DrawSvg />
      </div>
    </div>
  );
}

export default RoadMap;
