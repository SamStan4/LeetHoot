export default function PlayerViewComponenet({ playerName, onRemove }) {
  return (
    <div className="w-full flex items-center justify-between px-4 py-2 border border-[#444] rounded-xl shadow-sm text-white">
      <p className="text-md font-medium">{playerName}</p>
      <button
        onClick={onRemove}
        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md font-semibold transition duration-200"
      >
        Remove
      </button>
    </div>
  );
}