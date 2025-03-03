import { useParams } from 'react-router-dom';
import WaitingForHost from '@components/game-components/WaitingForHost';

export default function PlayGamePage() {
  const { "game-id": gameId, "player-name": playerName } = useParams();
  return (
    <div className="flex justify-center items-center w-full h-full">
      <WaitingForHost/>
    </div>
  );
}