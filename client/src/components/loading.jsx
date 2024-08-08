import './loading.css';

export default function loading() {
  return (
    <div className='loader'>
      <span className='loader-text'>loading</span>
      <span className='load'></span>
    </div>
  );
}
