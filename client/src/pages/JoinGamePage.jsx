import { useParams } from 'react-router-dom';

//Probably going to end up using this to get both the game pin and name 
//since those pages are almost identical
export default function JoinGamePage() {
  const { "game-id": gameId } = useParams();
  return (
    <div>
            <input className="host" type="button" value="host"></input>
            <h1>LeetHoot</h1>
            <div className="box">
                <div>
                    <input className="game-pin" type="text" placeholder="Game PIN"></input>
                </div>
                <div>
                    <button className="enter">Enter</button>
                </div>
            </div>
        </div>
  );
}