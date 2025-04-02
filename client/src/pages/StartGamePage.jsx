import { getAllQuestions } from "@utility/api";
import ProblemSelectPreview from "@components/ProblemSelectPreview";
import { useState, useEffect } from "react";

export default function StartGamePage() {
  const [questionList, setQuestionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const questions = await getAllQuestions();
        setQuestionList(questions);
      } catch (err) {
        setError("Failed to fetch questions.");
      } finally {
        setLoading(false);
      }
    };
    getQuestions();
  }, []);

  const handleToggleCheck = (questionName, checked) => {
    setSelectedQuestions((prevSelected) => {
      if (checked) {
        return [...prevSelected, questionName];
      } else {
        return prevSelected.filter((name) => name !== questionName);
      }
    });
  };

  const handleStartGame = () => {
    console.log("Game started with:", selectedQuestions)
  }

  return (
    <div className="flex justify-center min-w-full min-h-full">
      <div className="w-[50%] bg-[#212526] rounded-[20px] border-[1px] border-[#87898A] flex flex-col items-center gap-[15px]">
        <h1 className="mt-[15px] text-white text-[30px]">Build a Deck</h1>
        {!loading && !error && questionList.length > 0 && (
          // Right now the scroll bar is way to the right
          <div className="w-full flex flex-col gap-[10px] max-h-[70%] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 px-2">
            {questionList.map((question) => (
              <ProblemSelectPreview
                key={question.questionName}
                problemName={question.questionName}
                problemDifficulty={question.questionDifficulty}
                onToggleCheck={(checked) => handleToggleCheck(question.questionName, checked)}
              />
            ))}
          </div>
        )}
        <button
          className="mt-4 px-6 py-3 bg-[#6c63ff] text-white text-lg font-semibold rounded-lg hover:bg-[#5851cc] transition duration-200 disabled:bg-gray-600"
          disabled={selectedQuestions.length === 0}
          onClick={handleStartGame}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}