import { useParams } from 'react-router-dom';
import WaitingForHost from '@components/game-components/WaitingForHost';
import CodeEditor from '@components/game-components/CodeEditorPage';

export default function PlayGamePage() {
  const { "game-id": gameId, "player-name": playerName } = useParams();
  return (
    <div className="flex justify-center items-center w-full h-full">
      {/* <WaitingForHost/> */}
      <CodeEditor/>
    </div>
  );
}