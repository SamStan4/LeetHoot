import CodeEditorComponent from "@components/game-components/CodeEditorComponent";
import ProblemDetailsComponent from "@components/game-components/ProblemDetailsComponent";
import { useEffect, useState } from "react";

export default function CodeEditorPage() {
  const [codeText, setCodeText] = useState("");
  const [mdContent, setMdContent] = useState("");
  const [terminalContent, setTerminalContent] = useState("PASSED");
  const [problemName, setProblemName] = useState("");

  useEffect(() => {
    // Setting the actual problem name
    setProblemName("two-sum");
    
    // set the code text
    setCodeText("def two_sum(nums: list[int], target: int):\n\t");

    // Setting the mark down content
    setMdContent("# Two Sum problem thing\n\n```js\nconsole.log(\"solve me\")\n```");
  }, []);

  const handleSubmitCode = async () => {
    console.log("submitting code");
  };

  const handleRunCode = async () => {
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