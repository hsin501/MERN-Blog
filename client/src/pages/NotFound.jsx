import Game from '../components/game/Game.jsx';
import '../components/game/Game.css';

export default function NotFound() {
  return (
    <div>
      <div className='flex flex-col items-center my-8'>
        <h1 className='text-4xl p-2'>404 Not Found</h1>
        <p>若有任何疑問，請聯絡開發人員</p>
        <Game rows={20} columns={10} />
      </div>
    </div>
  );
}
