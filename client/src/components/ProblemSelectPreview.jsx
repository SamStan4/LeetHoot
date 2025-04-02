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
    onToggleCheck();
  };
  return (
    <div className="w-[100%] h-[40px] flex items-center gap-6 px-4 bg-[#2a2d2e] rounded-lg border border-[#3a3d3e] hover:bg-[#333638] transition duration-200">
      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
      <p className="text-white text-sm font-medium">{problemName}</p>
      <p className="ml-auto text-gray-400 text-sm font-light">{problemDifficulty}</p>
    </div>
  );
};