import CodeEditorComponent from "@components/game-components/CodeEditorComponent";
import ProblemDetailsComponent from "@components/game-components/ProblemDetailsComponent";
import { useEffect, useState } from "react";
import { getProblemDetails, getCurrentProblemPlayer } from "@utility/api";

export default function CodeEditorPage({ gameID, playerName }) {
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
  }, []);

  useEffect(() => {
    const setDetails = async () => {
      const problemDetails = await getProblemDetails(problemName);
      if (!problemDetails) {
        return;
      }
      setCodeText(problemDetails.solutionTemplate);
      setMdContent(problemDetails.description);
    };
    setDetails();
  }, [problemName]);

  const handleSubmitCode = async () => {
    // TODO: add a submit route in the backend
    console.log("submitting code");
  };

  const handleRunCode = async () => {
    // TODO: add a run route in the backend
    console.log("running code");
    setTerminalContent("passed!");
  }

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