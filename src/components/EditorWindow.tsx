import { useRef, useEffect } from 'react';

import '@styles/EditorWindow.css';

export const EditorWindow = ({ code, lineNumbers, onCodeChange }) => {
  const codeRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.value = code;
    }
  }, [code]);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = event.target.value;
    const newLineNumbers = event.target.value.split('\n').length;
    onCodeChange(newCode, newLineNumbers);
    const lineCount = event.target.value.split('\n').length;
    const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1).join(
      '\n',
    );
    if (lineNumbersRef.current) {
      lineNumbersRef.current.innerText = lineNumbers;
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLTextAreaElement>) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = event.currentTarget.scrollTop;
    }
  };

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.focus();
    }
    if (lineNumbersRef.current) {
      lineNumbersRef.current.innerText = Array.from(
        { length: lineNumbers },
        (_, i) => i + 1,
      ).join('\n');
    }
  }, [lineNumbers]);

  console.log('render2');

  return (
    <div className='code-container'>
      <pre ref={lineNumbersRef} className='line-numbers'></pre>
      <textarea
        ref={codeRef}
        className='code'
        onInput={handleInput}
        onScroll={handleScroll}
      ></textarea>
    </div>
  );
};
