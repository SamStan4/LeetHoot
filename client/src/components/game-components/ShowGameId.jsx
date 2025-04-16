export default function ShowGameId({
  gameId,
  onStartGame
}) {
    return (
      <div className="w-[40%] h-[50%] min-h-[200px] min-w-[200px] bg-[#212526] rounded-[20px] border-[1px] border-[#87898A] flex flex-col items-center justify-center">
        {/* <h1
          className="text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:focus:ring-gray-800 w-[50%]"
        >
          Game ID: {gameId}</h1> */}
        <div
          className="w-[90%] h-[25%] flex items-center justify-center"
        >
          <h1
            className="text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:focus:ring-gray-800 w-[50%]"
          >
            Game ID: {gameId}
          </h1>
        </div>
        <div
          className="w-[90%] h-[35%] flex items-center justify-center"
        >
          <button
            type="button"
            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 w-[50%]"
            onClick={onStartGame}
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }