import { useEffect, useState } from "react";
import { getAllGames, deleteGameAdmin } from "@utility/api";
import GameSessionViewComponent from "@components/GameSessionViewComponent";

export default function AdminViewPage() {
  const [gameSessions, setGameSessions] = useState([]);

  useEffect(() => {
    const getSetGames = async () => {
      const games = await getAllGames();
      setGameSessions(games);
    };
    getSetGames();
  }, []);

  const handleDeleteGame = async (gameID) => {
    const response = await deleteGameAdmin(gameID);
    const getSetGames = async () => {
      const games = await getAllGames();
      setGameSessions(games);
    };
    getSetGames();
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[60%] h-full bg-[#212526] rounded-[20px] border-[1px] border-[#87898A] flex flex-col justify-center items-center">
        <div className="w-[90%] h-[90%] flex flex-col items-center overflow-y-auto">
          {gameSessions.map((gameSession, index) => (
            <GameSessionViewComponent
              key={index}
              gameID={gameSession.gameID}
              onDelete={() => handleDeleteGame(gameSession.gameID)}
            />
          ))}
        </div>
      </div>
    </div>
  ) ;
}