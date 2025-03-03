import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const handleRedirect = (path) => {
    navigate(path);
  }
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-[40%] h-[40%] min-h-[200px] min-w-[200px] bg-[#212526] rounded-[20px] border-[1px] border-[#87898A] flex flex-col items-center justify-center gap-[15px]">
        <button
          type="button"
          className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 w-[50%]"
          onClick={() => handleRedirect("/join-game")}
        >
          Join Game
        </button>
        <button
          type="button"
          className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 w-[50%]"
          onClick={() => handleRedirect("/start-game")}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}