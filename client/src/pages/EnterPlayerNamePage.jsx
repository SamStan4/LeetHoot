import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { registerPlayer } from "@utility/api.js";

export default function EnterPlayerNamePage() {
  const { "game-id": gameId } = useParams();
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSelectName = async () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setErrorMessage("Invalid name entry");
      return;
    } else if (!await registerPlayer(gameId, trimmedName)) {
      setErrorMessage("Name already taken");
      return;
    }
    navigate(`/play-game/${gameId}/${name}`);
  }
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-[40%] h-[40%] min-h-[200px] min-w-[200px] bg-[#212526] rounded-[20px] border-[1px] border-[#87898A] flex flex-col items-center justify-center gap-[15px]">
        <input
          type="text"
          className="text-gray-900 border border-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:focus:ring-gray-800 w-[50%]"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="button"
          className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 w-[50%]"
          onClick={handleSelectName}
        >
          Select Name
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