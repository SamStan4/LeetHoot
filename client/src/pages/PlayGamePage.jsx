import { useParams } from 'react-router-dom';
import WaitingForHost from '@components/game-components/WaitingForHost';
import CodeEditor from '@components/game-components/CodeEditorPage';
import GameOverComponent from '@components/game-components/GameOverComponent';
import socket from '@utility/socket';
import { GAME_STATES } from '@const/gameStates';
import { getCurGameStatePlayer } from '@utility/api';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function PlayGamePage() {
  const [gameState, setGameState] = useState(GAME_STATES.PRE_LOBBY);
  const [canSee, setCanSee] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { "game-id": gameId, "player-name": playerName } = useParams();
  const navitate = useNavigate();

  useEffect(() => {
    const handleGameState = async () => {
      getCurGameStatePlayer(gameId).then(setGameState);
      setRefreshTrigger((prev) => prev + 1);
      setCanSee(true);
    };
    const handleEndGame = () => {
      navitate("/");
    };
    if (!gameId || !playerName) {
      console.error("ERROR: gameID or playerName undefined");
      return;
    }
    socket.emit("player-join-game", { gameID: gameId, playerName: playerName });
    socket.on("update-game-state", handleGameState);
    socket.on("game-end", handleEndGame);
    return () => {
      socket.off("update-game-state", handleGameState);
      socket.off("end-game", handleEndGame);
    };
  }, [gameId]);

  let content;

  switch (gameState) {
    case GAME_STATES.PRE_LOBBY:
      content = (
        <WaitingForHost/>
      );
    break;
    case GAME_STATES.RUNNING:
      if (canSee) {
        content = (
          <CodeEditor gameID={gameId} playerName={playerName} refreshTrigger={refreshTrigger} setCanSee={setCanSee}/>
        );
      } else {
        content = (
          <WaitingForHost/>
        );
      }
    break;
    case GAME_STATES.POST_LOBBY:
      content = (
        <GameOverComponent/>
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
    <div className="flex justify-center items-center w-full h-full">
      {content}
    </div>
  );
}