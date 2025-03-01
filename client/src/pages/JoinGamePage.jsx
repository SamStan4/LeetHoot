import { useParams } from 'react-router-dom';

export default function JoinGamePage() {
  const { "game-id": gameId } = useParams();
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-blue-100">
      <h1>Join a Game : {gameId}</h1>
    </div>
  );
}