import { useParams } from 'react-router-dom';
import ShowGameId from '@components/game-components/ShowGameId';

export default function RunGamePage() {
  const { "game-id": gameId } = useParams();
  return (
    <div className="flex justify-center items-center w-full h-full">
      <ShowGameId gameId={gameId}/>
    </div>
  );
}