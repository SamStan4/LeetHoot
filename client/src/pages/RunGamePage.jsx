import { useParams } from 'react-router-dom';
import ShowGameId from '@components/game-components/ShowGameId';
import ShowQuestion from '@components/game-components/showQuestion';
import ShowScoreBoard from '@components/game-components/ShowScoreBoard';
import { useEffect, useState } from 'react';
import socket from '@utility/socket';
import { GAME_STATES } from '@const/gameStates';
import { getCurGameStateHost, incrementDeckIndex } from '@utility/api';
import { useNavigate } from "react-router-dom";

export default function RunGamePage() {
  const [gameState, setGameState] = useState(GAME_STATES.PRE_LOBBY);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { "game-id": gameId } = useParams();
  const navitate = useNavigate();

  useEffect(() => {
    const handleGameState = () => {
      getCurGameStateHost(gameId).then(setGameState);
      setRefreshTrigger((prev) => prev + 1);
    };
    const handleEndGame = () => {
      navitate("/");
    };
    if (!gameId) return;
    socket.emit("host-join-game", { gameID: gameId });
    socket.on("update-game-state", handleGameState);
    socket.on("game-end", handleEndGame);
    return () => {
      socket.off("update-game-state", handleGameState);
      socket.off("end-game", handleEndGame);
    }
  }, [gameId]);

  const handleStartGame = async () => {
    incrementDeckIndex(gameId);
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
        <ShowScoreBoard
          gameID={gameId}
        />
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