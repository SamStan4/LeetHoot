import { useState } from "react";
import ReactMarkdown from 'react-markdown'

export default function ProblemDetailsComponent({ mdContent, terminalContent }) {
  const [termDescToggleState, setTermDescToggleState] = useState(true);
  return (
    <div className="w-[40%] h-full bg-[#212526] rounded-[20px] border-[1px] border-[#87898A] flex items-center justify-center">
      <div className="w-[97%] h-[97%] flex flex-col">
        <div className="w-full h-[6%] mb-[1%] rounded-[20px] border-[1px] border-[#87898A] flex items-center justify-center">
          <div className="w-[95%] h-[95%] flex items-center gap-[10px]">
            <button
              onClick={() => setTermDescToggleState(true)}
              className="h-[70%] bg-[#2196F3] text-white px-4 rounded-lg hover:bg-[#1976D2] transition text-sm sm:text-base flex items-center justify-center"
            >
              Show Description
            </button>
            <button
              onClick={() => setTermDescToggleState(false)}
              className="h-[70%] bg-[#4CAF50] text-white px-4 rounded-lg hover:bg-[#45A049] transition text-sm sm:text-base flex items-center justify-center"
            >
              Show Terminal
            </button>
          </div>
        </div>
        <div className="w-full h-[93%]">
          {termDescToggleState ? (
            <div className="w-full h-full overflow-auto prose prose-invert max-w-none text-[#FFFFFF]">
              <ReactMarkdown>
                {mdContent}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="w-full h-full bg-black text-green-400 font-mono text-sm p-4 rounded-lg overflow-auto whitespace-pre-wrap">
              <pre>{terminalContent}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}