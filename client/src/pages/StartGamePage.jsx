import { useParams } from 'react-router-dom';

export default function StartGamePage() {
  const { "game-id": gameId } = useParams();
  return (
    <div>
      <h1>Start a Game</h1>
    </div>
  );
}