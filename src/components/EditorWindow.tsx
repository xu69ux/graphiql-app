import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';

import '@styles/EditorWindow.css';

interface IEditWindowProps {
  code: string;
  disabled?: boolean;
  updateData?: (data: string) => void;
}

export const EditorWindow: FC<IEditWindowProps> = ({
  code,
  updateData,
  disabled = false,
}) => {
  const lines = useRef<HTMLPreElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const [inputCode, setInputCode] = useState(code);
  const [highlightedCode, setHighlightedCode] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputCode(e.target.value);
    recalcLines(e.target.value);
  };

  const recalcLines = (code: string) => {
    const numLines = code.split('\n').length;
    const newLines = Array.from({ length: numLines }, (_, i) => i + 1).join(
      '\n',
    );
    lines.current!.innerText = newLines;
  };

  useEffect(() => {
    recalcLines(code);
  }, [code]);

  useEffect(() => {
    const keywords = ['query'];
    const braces = ['{', '}'];

    const highlightedQuery = inputCode
      .split(/(\s+|\{|\})/)
      .map((word) => {
        if (braces.includes(word.trim())) {
          return `<span class="braces">${word}</span>`;
        }
        if (keywords.includes(word.trim())) {
          return `<span class="keyword">${word}</span>`;
        } else {
          return word;
        }
      })
      .join('');

    setHighlightedCode(highlightedQuery);
  }, [inputCode]);

  return (
    <div className='code-container'>
      <pre className='line-numbers' ref={lines} />
      <textarea
        className='code'
        ref={textarea}
        onChange={handleChange}
        value={inputCode}
        onBlur={(e) => {
          e.stopPropagation();
          if (updateData && e.target.value !== code) {
            updateData(e.target.value);
          }
        }}
        disabled={disabled}
      />
      <div
        className='highlighted-code'
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </div>
  );
};
