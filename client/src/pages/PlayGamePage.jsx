import { useParams } from 'react-router-dom';

export default function PlayGamePage() {
  const { "game-id": gameId } = useParams();
  return (
    <div>
      <h1>Play a Game : {gameId}</h1>
    </div>
  );
}