import { useParams } from 'react-router-dom';
import "./JoinGamePage.css"

//Probably going to end up using this to get both the game pin and name 
//since those pages are almost identical
export default function JoinGamePage() {
  const { "game-id": gameId } = useParams();
  return (
    <div>
        <input className="bg-gray-700 hover:bg-blue-700 border text-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline host-button" type="button" value="host"></input>
        <h1 className='text-white'>LeetHoot</h1>
        <div className="bg-gray-700 rounded border border-gray-100 game-values">
            <div>
                <input className="bg-gray-700 shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline user-input" type="text" placeholder="Game PIN"></input>
            </div>
            <div>
                <input className='bg-gray-700 hover:bg-blue-700 text-gray-100 font-bold py-2 px-4 rounded border border-gray-100 focus:outline-none focus:shadow-outline enter-button' type='button' value='Enter'></input>
            </div>
        </div>
    </div>
  );
}