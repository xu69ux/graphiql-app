import { ChangeEvent, FC, useEffect, useRef } from 'react';

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

  const recalcLines = (code: string) => {
    const numLines = code.split('\n').length;
    const newLines = Array.from({ length: numLines }, (_, i) => i + 1).join(
      '\n',
    );
    lines.current!.innerText = newLines;
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    recalcLines(e.target.value);
  };

  useEffect(() => {
    recalcLines(code);
  }, [code]);

  console.log('render');

  return (
    <div className='code-container'>
      <pre className='line-numbers' ref={lines} />
      <textarea
        className='code'
        ref={textarea}
        onChange={handleChange}
        defaultValue={code}
        onBlur={(e) => {
          e.stopPropagation();
          if (updateData && e.target.value !== code) {
            updateData(e.target.value);
          }
        }}
        disabled={disabled}
      />
    </div>
  );
};
