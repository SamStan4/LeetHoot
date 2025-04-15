import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { useEffect, useRef, useState } from 'react';

export default function CodeEditorComponent({ codeText, setCodeText, onSubmit, onRun }) {
  const codeMirrorContainerRef = useRef(null);
  const [codeMirrorContainerHeight, setCodeMirrorContainerHeight] = useState(0);

  useEffect(() => {
    if (codeMirrorContainerRef.current) {
      setCodeMirrorContainerHeight(codeMirrorContainerRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (codeMirrorContainerRef.current) {
        setCodeMirrorContainerHeight(codeMirrorContainerRef.current.offsetHeight);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-[59%] h-full bg-[#212526] rounded-[20px] border-[1px] border-[#87898A] flex items-center justify-center">
      <div className=" w-[97%] h-[97%] flex flex-col">
        <div ref={codeMirrorContainerRef} className="w-full h-[93%] mb-[1%] max-h-[94%] overflow-auto">
          <CodeMirror
            value={codeText}
            height={`${codeMirrorContainerHeight}px`}
            width="100%"
            extensions={[
              python(),
            ]}
            onChange={(newCodeText) => setCodeText(newCodeText)}
            theme="dark"
            basicSetup={{ lineNumbers: true }}
          />
        </div>
        <div className="w-full h-[6%] rounded-[20px] border-[1px] border-[#87898A] flex items-center justify-center">
          <div className="w-[95%] h-[95%] flex items-center gap-[10px]">
            <button
              onClick={onRun}
              className="h-[70%] bg-[#4CAF50] text-white px-4 rounded-lg hover:bg-[#45A049] transition text-sm sm:text-base flex items-center justify-center"
            >
              Run Code
            </button>
            <button
              onClick={onSubmit}
              className="h-[70%] bg-[#2196F3] text-white px-4 rounded-lg hover:bg-[#1976D2] transition text-sm sm:text-base flex items-center justify-center"
            >
              Submit Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}