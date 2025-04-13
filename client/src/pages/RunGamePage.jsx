import { useParams } from 'react-router-dom';
import ShowGameId from '@components/game-components/ShowGameId';
import ShowQuestion from '@components/game-components/showQuestion';

export default function RunGamePage() {
  const { "game-id": gameId } = useParams();
  return (
    <div className="w-full h-full flex justify-center items-center">
      {/* <ShowGameId gameId={gameId}/> */}
      <ShowQuestion gameId={gameId}/>
    </div>
  );
}