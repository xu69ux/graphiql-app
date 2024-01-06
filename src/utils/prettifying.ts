import { INDENTATION } from '@constants/constants';

const fixStuckedBrackets = (code: string) => {
  return code
    .replaceAll(/(?<=\w){/g, ' {')
    .replaceAll(/}(?=\w)/g, '} ')
    .replaceAll(/:(?=\w)/g, ': ');
};

export const prettify = (code: string) => {
  let indentationLevel = 0;
  let result = '';
  let check = false;
  result = fixStuckedBrackets(code);
  const lines = result.split('\n');
  result = '';
  lines.forEach((line) => {
    line = line.trim();
    if (line.match(/\S/)) {
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '{') {
          indentationLevel++;
          result += check
            ? `\n${char}\n${INDENTATION.repeat(indentationLevel)}`
            : `${char}\n${INDENTATION.repeat(indentationLevel)}`;
        } else if (char === '}') {
          indentationLevel--;
          result +=
            indentationLevel < 0
              ? `\n}`
              : `\n${INDENTATION.repeat(indentationLevel)}}`;
        } else {
          if (check) {
            check = false;
            result += `\n${INDENTATION.repeat(indentationLevel)}${char}`;
          } else if (i + 1 === line.length) {
            check = true;
            result += char;
          } else {
            result += char;
          }
        }
      }
    }
  });
  return result;
};
