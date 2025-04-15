import { useParams } from 'react-router-dom';
import ShowGameId from '@components/game-components/ShowGameId';
import ShowQuestion from '@components/game-components/showQuestion';
import { useEffect, useState } from 'react';
import socket from '@utility/socket';
import { GAME_STATES } from '@const/gameStates';

export default function RunGamePage() {
  const [gameState, setGameState] = useState(GAME_STATES.RUNNING);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { "game-id": gameId } = useParams();

  useEffect(() => {
    const handleGameState = (newGameState) => setGameState(newGameState);
    if (!gameId) return;
    socket.emit("host-join-game", { gameID: gameId });
    socket.on("update-game-state", handleGameState);
    return () => socket.off("update-game-state", handleGameState);
  }, [gameId])

  const handleStartGame = async () => {
    console.log("starting the game");
  }

  let content;

  switch (gameState) {
    case GAME_STATES.PRE_LOBBY:
      content = (
        <ShowGameId
          gameId={gameId}
          onStartGame={handleStartGame}
        />
      );
    break;
    case GAME_STATES.RUNNING:
      content = (
        <ShowQuestion
          gameID={gameId}
          refreshTrigger={refreshTrigger}
        />
      );
    break;
    case GAME_STATES.POST_LOBBY:
      // TODO: implement this
      content = (
        <div>
          <h1>
            Not implemented
          </h1>
        </div>
      );
    break;
    default:
       content = (
        <div>
          <h1>Error, unknown game state</h1>
        </div>
       );
    break;
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      {content}
    </div>
  );
}