import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { checkCode, prettify } from '../utils/prettifying';

import '@styles/EditorWindow.css';

interface IEditWindowProps {
  code: string;
  disabled?: boolean;
  updateData?: (data: string) => void;
}

const keywords = ['query'];
const braces = ['{', '}'];

export const EditorWindow: FC<IEditWindowProps> = ({
  code,
  updateData,
  disabled = false,
}) => {
  const lines = useRef<HTMLPreElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const [inputCode, setInputCode] = useState(code);
  const [highlightedCode, setHighlightedCode] = useState('');

  const recalcLines = (code: string) => {
    const numLines = code.split('\n').length;
    lines.current!.innerText = Array.from(
      { length: numLines },
      (_, i) => i + 1,
    ).join('\n');
  };
  useEffect(() => {
    setInputCode(code);
  }, [code]);

  useEffect(() => {
    recalcLines(code);
  }, [code]);

  useEffect(() => {
    console.log(inputCode);
    const formattedQuery = checkCode(inputCode);
    console.log(formattedQuery);
    if (formattedQuery && typeof formattedQuery === 'string') {
      setInputCode(formattedQuery);
    } else if (formattedQuery && typeof formattedQuery !== 'string') {
      setInputCode(formattedQuery.join(' '));
    }
  }, [inputCode]);

  useEffect(() => {
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

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    checkCode(newCode);
    setInputCode(newCode);
    recalcLines(newCode);
    if (updateData && newCode !== code) {
      updateData(newCode);
    }
  };

  return (
    <div className='code-container'>
      <pre className='line-numbers' ref={lines} />
      <textarea
        className='code'
        ref={textarea}
        onChange={handleChange}
        value={inputCode}
        onKeyDown={(e) => {
          if (e.key === 'Tab') {
            e.preventDefault();
            const start = e.currentTarget.selectionStart;
            const end = e.currentTarget.selectionEnd;
            setInputCode(
              inputCode.substring(0, start) + '    ' + inputCode.substring(end),
            );
            e.currentTarget.selectionStart = e.currentTarget.selectionEnd =
              start + 4;
          }
        }}
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
