import { useState } from 'react';

export const EditWindow = ({ code }: { code: string }) => {
  const [lines, setLines] = useState(1);

  const handleChange = (e) => {
    let newLines = event.target.value.split('\n').length;
    if (newLines !== lines) {
      newLines = Array.from({ length: newLines }, (_, i) => i + 1).join('\n');
      setLines(newLines);
    }
  };

  console.log('render');

  return (
    <div className='code-container'>
      <pre className='line-numbers'>{lines}</pre>
      <textarea className='code' onChange={handleChange}>
        {code}
      </textarea>
    </div>
  );
};
