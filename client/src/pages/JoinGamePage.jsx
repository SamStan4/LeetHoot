import { useParams } from 'react-router-dom';

export default function JoinGamePage() {
  const { "game-id": gameId } = useParams();
  return (
    <div>
      <h1>Join a Game : {gameId}</h1>
    </div>
  );
}