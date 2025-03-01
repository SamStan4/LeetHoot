import { useParams } from 'react-router-dom';

export default function GameOverPage() {
  const { "game-id": gameId } = useParams();
  return (
    <div>
      <h1>Game Over : {gameId}</h1>
    </div>
  );
}