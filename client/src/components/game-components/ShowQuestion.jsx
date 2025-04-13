import { useEffect, useState } from "react";
import { getCurrentProblemHost } from "@utility/api";
import ReactMarkdown from "react-markdown";

export default function ShowQuestion({ gameID }) {
  const [problemName, setProblemName] = useState ("");
  const [problemMD, setProblemMD] = useState("");

  // To load the current problem name
  useEffect(() => {
    const getProblemAndSet = async () => {
      const newProblemName = await getCurrentProblemHost(gameID);
      if (newProblemName || newProblemName.length !== 0) {
        setProblemName(newProblemName);
      }
    };
    getProblemAndSet();
  }, []);

  // To load the problem details once the problem name has been loaded
  useEffect(() => {

  }, [problemName])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="h-full w-[60%] bg-[#212526] rounded-[20px] border-[1px] border-[#87898A]">
      </div>
    </div>
  );
}