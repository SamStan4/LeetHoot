import { useState } from "react";

export default function ProblemSelectPreview({
  problemName,
  problemDifficulty,
  onToggleCheck
}) {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    onToggleCheck(checked);
  };

  const difficultyColors = {
    easy: "bg-green-500 text-black",
    medium: "bg-yellow-500 text-black",
    hard: "bg-red-500 text-white"
  };

  return (
    <div className="w-[100%] min-h-[40px] p-4 flex items-center gap-6 px-4 bg-[#2a2d2e] rounded-lg border border-[#3a3d3e] hover:bg-[#333638] transition duration-200">
      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
      <p className="text-white text-sm font-medium">{problemName}</p>
      <div className={`ml-auto px-2 py-1 rounded-md text-xs font-bold ${difficultyColors[problemDifficulty] || "bg-gray-500 text-white"}`}>
        {problemDifficulty}
      </div>
    </div>
  );
};