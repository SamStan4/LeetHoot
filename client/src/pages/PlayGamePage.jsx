import { useParams } from 'react-router-dom';

export default function PlayGamePage() {
  const { "game-id": gameId } = useParams();
  return (
    <div className='rounded bg-gray-800'>
      <p className='text-white m-[5px]'>Code:</p>
      <input type='text' className='rounded bg-gray-600 w-[99%] h-[70vh] m-[5px]'></input>
      <input type='button' className='rounded border bg-green-500 justify-items-center m-[5px] w-[5%]' value='Submit'></input>
    </div>
  );
}