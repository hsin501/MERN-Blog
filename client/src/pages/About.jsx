import RoadMap from '../components/RoadMap';
import BlobAnimation from '../components/BlobAnimation';

export default function About() {
  return (
    <div className='flex flex-col'>
      <div className='flex justify-around w-full min-h-screen bg-gray-200 items-center'>
        <div className='border-red-200 border ml-8'>
          <p className='text-center mt-4  text-2xl'>Hsin</p>
          <p className='text-center mt-2'>Hi</p>
        </div>
        <div className=' flex border border-red-600'>
          <BlobAnimation />
        </div>
      </div>
      <div className=''>
        <RoadMap />
      </div>
    </div>
  );
}
