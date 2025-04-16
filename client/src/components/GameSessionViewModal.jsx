import { useState, useEffect } from "react";
import { getGamePlayers, deletePlayerAdmin } from "@utility/api";
import PlayerViewComponenet from "@components/PlayerViewComponent";

export default function GameSessionViewModal({ gameID, onDelete, onClose }) {
  const [playerList, setPlayerList] = useState([]);
  useEffect(() => {
    const getSetPlayers = async () => {
      const newPlayerList = await getGamePlayers(gameID);
      setPlayerList(newPlayerList);
    };
    getSetPlayers();
  }, []);

  const handleRemovePlayer = async (playerName) => {
    const result = await deletePlayerAdmin(gameID, playerName);
    const getSetPlayers = async () => {
      const newPlayerList = await getGamePlayers(gameID);
      setPlayerList(newPlayerList);
    };
    getSetPlayers();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="w-[50%] h-[70%] bg-[#212526] rounded-2xl border border-[#87898A] shadow-2xl p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-white">Game Details</h2>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition duration-200"
              onClick={() => onDelete(gameID)}
            >
              Delete
            </button>
            <button
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-medium transition duration-200"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
        <div className="flex-1 w-full bg-[#2A2D2E] rounded-xl p-4 overflow-auto border border-[#444]">
          <p className="text-white text-center text-lg">Game ID: <span className="text-blue-400">{gameID}</span></p>
          {/** how to space out the players a bit more? */}
          <div className="flex-1 w-full overflow-y-auto mt-[5px] space-y-1">
            {playerList.map((player, index) => (
              <PlayerViewComponenet
                key={index}
                playerName={player.playerName}
                onRemove={() => handleRemovePlayer(player.playerName)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}