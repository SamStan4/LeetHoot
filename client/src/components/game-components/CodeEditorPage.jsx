import CodeEditorComponent from "@components/game-components/CodeEditorComponent";
import ProblemDetailsComponent from "@components/game-components/ProblemDetailsComponent";
import { useEffect, useState } from "react";
import { getProblemDetails, getCurrentProblemPlayer, runClientCode, submitClientCode } from "@utility/api";

export default function CodeEditorPage({ gameID, playerName, refreshTrigger, setCanSee }) {
  const [codeText, setCodeText] = useState("");
  const [mdContent, setMdContent] = useState("");
  const [terminalContent, setTerminalContent] = useState("");
  const [problemName, setProblemName] = useState("");

  useEffect(() => {
    const getProblemName = async () => {
      const name = await getCurrentProblemPlayer(gameID, playerName);
      setProblemName(name);
    };
    getProblemName();
  }, [refreshTrigger]);

  useEffect(() => {
    const setDetails = async () => {
      const problemDetails = await getProblemDetails(problemName);
      if (!problemDetails) {
        return;
      }
      setCodeText(problemDetails.solutionTemplate);
      setMdContent(problemDetails.description);
      setTerminalContent("");
    };
    setDetails();
  }, [problemName]);

  const handleSubmitCode = () => {
    submitClientCode(codeText, problemName, playerName, gameID);
    setCanSee(false);
  };

  const handleRunCode = async () => {
    const result = await runClientCode(codeText, problemName);
    setTerminalContent(JSON.stringify(result, null, 2));  }

  return (
    <div className="w-full h-full flex justify-between">
      <ProblemDetailsComponent
        mdContent={mdContent}
        terminalContent={terminalContent}
      />
      <CodeEditorComponent
        codeText={codeText}
        setCodeText={setCodeText}
        onSubmit={handleSubmitCode}
        onRun={handleRunCode}
      />
    </div>
  );
}