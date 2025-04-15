import PlayerScoreComponent from "@components/game-components/PlayerScoreComponenet";
import { getLeaderBoard, endGameHost } from "@utility/api";
import { useEffect, useState } from "react";

export default function ShowScoreBoard({ gameID }) {
  const [leaderBoard, setLeaderBoard] = useState([]);

  useEffect(() => {
    const updateLeaderBoard = async () => {
      const newLeaderBoard = await getLeaderBoard(gameID);
      setLeaderBoard(newLeaderBoard);
    };
    updateLeaderBoard();
  }, []);

  const handleEndGame = async () => {
    await endGameHost(gameID);
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="w-[60%] h-[90%] flex flex-col items-center overflow-y-auto">
        {leaderBoard.map((player, index) => (
          <PlayerScoreComponent
            key={index}
            playerName={player.playerName}
            playerScore={player.score}
            place={index + 1}
          />
        ))}
      </div>
      <div className="w-[60%] h-[10%] flex items-center justify-center">
        <button
          onClick={handleEndGame}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-200"
        >
          End Game
        </button>
      </div>
    </div>
  );
};