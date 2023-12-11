import { ChangeEvent, FC, useEffect, useRef } from 'react';

interface IEditWindowProps {
  code: string;
  updateData: (data: string) => void;
}

export const EditWindow: FC<IEditWindowProps> = ({ code, updateData }) => {
  const linesComponent = useRef<HTMLPreElement>(null);

  const recalcLines = (code: string) => {
    const numLines = code.split('\n').length;
    const newLines = Array.from({ length: numLines }, (_, i) => i + 1).join(
      '\n',
    );
    linesComponent.current!.innerText = newLines;
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    recalcLines(e.target.value);
  };

  useEffect(() => {
    recalcLines(code);
  }, []);

  console.log('render');

  return (
    <div className='code-container'>
      <pre className='line-numbers' ref={linesComponent} />
      <textarea
        className='code'
        onChange={handleChange}
        defaultValue={code}
        onBlur={(e) => updateData(e.target.value)}
      />
    </div>
  );
};
