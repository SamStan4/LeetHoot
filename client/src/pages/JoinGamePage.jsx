import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkGameExistance } from "@utility/api.js";

export default function JoinGamePage() {
  const [gameId, setGameId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleJoinGame = async () => {
    const trimmedId = gameId.trim();
    if (!trimmedId) {
      setErrorMessage("Enter a game ID");
      return;
    } else if (!(/^\d+$/.test(trimmedId))) {
      setErrorMessage("Game ID must be all numeric characters");
      return;
    } else if (!await checkGameExistance(trimmedId)) {
      setErrorMessage(`Game with ID ${trimmedId} does not exist`);
      return;
    }
    navigate(`/play-game/${gameId}`);
  };
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-[40%] h-[40%] min-h-[200px] min-w-[200px] bg-[#212526] rounded-[20px] border-[1px] border-[#87898A] flex flex-col items-center justify-center gap-[15px]">
        <input
          type="text"
          className="text-gray-900 border border-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:focus:ring-gray-800 w-[50%]"
          placeholder="game ID"
          onChange={(e) => setGameId(e.target.value)}
        />
        <button
          type="button"
          className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 w-[50%]"
          onClick={handleJoinGame}
        >
          Join Game
        </button>
          {errorMessage && (
            <span className="text-red-500 text-sm">
              {errorMessage}
            </span>
          )}
      </div>
    </div>
  );
}