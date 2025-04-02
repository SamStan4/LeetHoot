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

  return (
    <div className="flex justify-center w-full h-full">
      <div className="w-[50%] bg-[#212526] rounded-[20px] border-[1px] border-[#87898A] flex flex-col items-center gap-[15px]">
        <h1 className="mt-[15px]">Choose a deck</h1>
        {!loading && !error && questionList.length > 0 && (
          <div
            className="
              w-[90%]
              flex
              flex-col
              gap-[10px]
            "
          >
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
      </div>
    </div>
  );
}