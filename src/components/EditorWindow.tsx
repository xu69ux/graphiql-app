import { useRef, useEffect } from 'react';

import '@styles/EditorWindow.css';

export const EditorWindow = () => {
  const codeRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLPreElement>(null);

  const handleInput = (event) => {
    const lineCount = event.target.value.split('\n').length;
    const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1).join(
      '\n',
    );
    if (lineNumbersRef.current) {
      lineNumbersRef.current.innerText = lineNumbers;
    }
  };

  const handleScroll = (event) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = event.target.scrollTop;
    }
  };

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.focus();
    }
    if (lineNumbersRef.current) {
      lineNumbersRef.current.innerText = '1';
    }
  }, []);

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
