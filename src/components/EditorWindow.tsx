import { ChangeEvent, FC, useEffect, useRef, KeyboardEvent } from 'react';
import { prettify } from '../utils/prettifying';
import { INDENTATION } from '../constants';

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
  const highlightedCode = useRef<HTMLDivElement>(null);

  const pressed = new Set();

  useEffect(() => {
    recalcLines(code);
  }, [code]);

  const recalculateLines = (code: string) => {
    const numLines = code.split('\n').length;
    lines.current!.innerText = Array.from(
      { length: numLines },
      (_, i) => i + 1,
    ).join('\n');
  };

  const insertIntoString = (
    start: number,
    end: number,
    text: string,
    indent: number = text.length,
  ) => {
    textarea.current!.value =
      textarea.current!.value.substring(0, start) +
      text +
      textarea.current!.value.substring(end);
    textarea.current!.selectionStart = start + indent;
    textarea.current!.selectionEnd = start + indent;
  };

  const highlightCode = () => {
    const highlightedQuery = textarea
      .current!.value.split(/(\s+|\{|\})/)
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

    highlightedCode.current!.innerHTML = highlightedQuery;
  };

  const getIndentationLevel = () => {
    let indentationLevel = 0;
    const selectionIndex = Math.max(
      textarea.current!.selectionStart,
      textarea.current!.selectionEnd,
    );
    const beforeSelectionText = textarea.current!.value.substring(
      0,
      selectionIndex,
    );
    for (const char of beforeSelectionText) {
      if (char === '{') {
        indentationLevel++;
      }
      if (char === '}') {
        indentationLevel--;
      }
    }
    return indentationLevel;
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const start = textarea.current!.selectionStart;
    const end = textarea.current!.selectionEnd;
    const indentationLevel = getIndentationLevel();
    pressed.add(e.code);
    if (e.code === 'Enter') {
      e.preventDefault();
      insertIntoString(start, end, `\n${INDENTATION.repeat(indentationLevel)}`);
    }
    if (e.code === 'Tab') {
      e.preventDefault();
      insertIntoString(start, end, INDENTATION);
    }
    if (
      (pressed.has('ShiftLeft') || pressed.has('ShiftRight')) &&
      pressed.has('BracketLeft')
    ) {
      e.preventDefault();
      const text = `{\n${INDENTATION.repeat(
        indentationLevel + 1,
      )}\n${INDENTATION.repeat(indentationLevel)}}`;
      insertIntoString(start, end, text, text.length - indentationLevel - 2);
    }
    highlightCode();
    recalcLines(textarea.current!.value);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    highlightCode();
    recalcLines(e.target.value);
  };

  console.log('render');

  return (
    <div className='code-container'>
      <pre className='line-numbers' ref={lines} />
      <textarea
        className='code'
        ref={textarea}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={(e) => pressed.delete(e.code)}
        onBlur={(e) => {
          e.stopPropagation();
          const formatedCode = prettify(e.target.value);
          e.target.value = formatedCode;
          highlightCode();
          if (updateData && e.target.value !== code) {
            updateData(formatedCode);
          }
        }}
        disabled={disabled}
      />
      <div className='highlighted-code' ref={highlightedCode} />
    </div>
  );
};
