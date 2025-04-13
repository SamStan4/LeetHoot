import { getAllProblems, registerGame } from "@utility/api";
import ProblemSelectPreview from "@components/ProblemSelectPreview";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function StartGamePage() {
  const [problemList, setProblemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProblems, setSelectedProblems] = useState([]);
  const navitate = useNavigate();

  useEffect(() => {
    const getProblems = async () => {
      try {
        const problems = await getAllProblems();
        setProblemList(problems);
      } catch (err) {
        setError("Failed to fetch questions.");
      } finally {
        setLoading(false);
      }
    };
    getProblems();
  }, []);

  const handleToggleCheck = (problemName, checked) => {
    setSelectedProblems((prevSelected) => {
      if (checked) {
        return [...prevSelected, problemName];
      } else {
        return prevSelected.filter((name) => name !== problemName);
      }
    });
  };

  const handleStartGame = async () => {
    const newGameID = await registerGame(selectedProblems);
    if (newGameID.length !== 0) {
      navitate(`/run-game/${newGameID}`);
    } else {
      alert("Error, unable to register game");
    }
  }

  return (
    <div className="flex justify-center min-w-full min-h-full">
      <div className="w-[50%] bg-[#212526] rounded-[20px] border-[1px] border-[#87898A] flex flex-col items-center gap-[15px]">
        <h1 className="mt-[15px] text-white text-[30px]">Build a Deck</h1>
        {!loading && !error && problemList.length > 0 && (
          // Right now the scroll bar is way to the right
          <div className="w-full flex flex-col gap-[10px] max-h-[70%] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 px-2">
            {problemList.map((problem) => (
              <ProblemSelectPreview
                key={problem.problemName}
                problemName={problem.problemName}
                problemDifficulty={problem.problemDifficulty}
                onToggleCheck={(checked) => handleToggleCheck(problem.problemName, checked)}
              />
            ))}
          </div>
        )}
        <button
          className="mt-4 px-6 py-3 bg-[#6c63ff] text-white text-lg font-semibold rounded-lg hover:bg-[#5851cc] transition duration-200 disabled:bg-gray-600"
          disabled={selectedProblems.length === 0}
          onClick={handleStartGame}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}