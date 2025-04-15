import { useEffect, useState } from "react";
import { getCurrentProblemHost, getProblemDetails, incrementDeckIndex } from "@utility/api";
import ReactMarkdown from "react-markdown";

export default function ShowQuestion({ gameID, refreshTrigger }) {
  const [problemName, setProblemName] = useState ("");
  const [problemMD, setProblemMD] = useState("");

  useEffect(() => {
    const getProblemAndSet = async () => {
      const newProblemName = await getCurrentProblemHost(gameID);
      if (newProblemName && newProblemName.length !== 0) {
        setProblemName(newProblemName);
      }
    };
    getProblemAndSet();
  }, [gameID, refreshTrigger]);

  useEffect(() => {
    const setMdContent = async () => {
      const problemDetails = await getProblemDetails(problemName);
      if (!problemDetails) {
        return;
      }
      const { description } = problemDetails;
      if (!description) {
        return;
      }
      setProblemMD(description);
    };
    setMdContent();
  }, [problemName])

  const handleNextProblem = async () => {
    const status = await incrementDeckIndex(gameID);
    if (!status) {
      alert("error incrementing game index");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="h-full w-[60%] bg-[#212526] rounded-[20px] border-[1px] border-[#87898A] flex flex-col justify-center items-center gap-[2%]">
        <div className="w-[95%] h-[10%] flex justify-center items-center">
          <h1 className="underline decoration-1 text-white text-[30px]">
            {problemName}
          </h1>
        </div>
        <div className="h-[70%] w-[95%] overflow-auto prose prose-invert max-w-none text-[#FFFFFF]">
          <ReactMarkdown>
            {problemMD}
          </ReactMarkdown>
        </div>
        <div className="h-[10%] w-[95%] flex justify-center items-center">
          <div className="h-[60%] w-[90%] rounded-[20px] border-[1px] border-[#87898A] flex items-center">
            <button
              onClick={handleNextProblem}
              className="h-[70%] bg-[#2196F3] text-white px-4 rounded-lg hover:bg-[#1976D2] transition text-sm sm:text-base flex items-center justify-center mr-[10px] ml-auto"
            >
              Next Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}