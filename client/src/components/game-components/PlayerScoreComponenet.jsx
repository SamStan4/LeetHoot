export default function PlayerScoreComponent({ playerName, playerScore, place }) {
  return (
    <div className="w-full px-4 py-2 my-2 bg-[#212526] rounded-[20px] border-[1px] border-[#87898A] flex items-center justify-between">
      <div className="text-xl font-bold text-green-600">{place}.</div>
      <div className="flex-1 ml-4 text-lg text-[#FFFFFF]">{playerName}</div>
      <div className="text-lg font-semibold text-green-600">{playerScore} pts</div>
    </div>
  );
}