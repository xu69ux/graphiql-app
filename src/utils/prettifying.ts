///////////////////// PRETTIFYING

const stuckBracketCheck = (word: string) => {
  if (word.length > 1 && word.match(/[{}()]/)) {
    word = word.replaceAll(/(?=>\w){/g, ' {');
    word = word.replaceAll(/(?=\w)\(/g, '( ');
    word = word.replaceAll(/}(?=\w)/g, '} ');
    word = word.replaceAll(/\)(?=>\w)/g, ' )');
    // console.log('stuckBracketCheck false');
    return word.split(' ');
  } else {
    // console.log('stuckBracketCheck true');
    return word;
  }
};

export const checkCode = (code: string) => {
  let wordIdx = 0;
  const nestingLevel = 0;
  const codeBlockType: string[] = [];
  // const bracketsLevels = {};
  const words = code.split(/[\n, \t, \s]/);

  // const rootLevel = ['mutation', 'subscription'];

  const checkFragmentPattern = () => {
    wordIdx += 1;
    for (let i = 0; i < 3; i++) {
      switch (i) {
        case 1:
          if (!words[wordIdx].match(/[A-Za-z0-9_]/g)) {
            // console.log('error');
          }
      }
    }
  };

  // const displayError = (word: string) => {
  //   // console.log(word, div.current!.innerText);
  //   div.current!.innerHTML = div.current!.innerHTML.replace(
  //     `${word}`,
  //     `<b>${word}</b>`,
  //   );
  //   // console.log('HTML', div.current!.innerHTML);
  // };

  const wordCheckOnRootLevel = () => {
    const word = words[wordIdx].toLowerCase();
    if (word === '{' || word === 'query') {
      // console.log('wordCheckOnRootLevel true');
      codeBlockType.push('query');
      return;
    }
    if (word === 'fragment') {
      codeBlockType.push('fragment');
      checkFragmentPattern();
      return;
    }
    // displayError(word);
  };

  while (wordIdx < words.length) {
    if (words[wordIdx] === '') {
      wordIdx += 1;
      return;
    }
    const res = stuckBracketCheck(words[wordIdx]);
    if (typeof res !== 'string') {
      words.splice(wordIdx, 1, ...res);
    }
    if (nestingLevel === 0) {
      wordCheckOnRootLevel();
    }
    wordIdx += 1;
    return res;
  }
};

/////////////////////

const fixStuckedBrackets = (code: string) => {
  return code
    .replaceAll(/(?<=\w){/g, ' {')
    .replaceAll(/}(?=\w)/g, '} ')
    .replaceAll(/:(?=\w)/g, ': ');
};

export const prettify = (code: string) => {
  let indentationLevel = 0;
  const INDENTATION = '  ';
  let result = '';
  code = fixStuckedBrackets(code);
  const lines = code.split('\n');

  lines.forEach((line) => {
    line = line.trim();
    if (line.match(/\S/)) {
      for (const char of line) {
        if (char === '{') {
          result += `${char}\n`;
          indentationLevel++;
          result += INDENTATION.repeat(indentationLevel);
        } else if (char === '}') {
          indentationLevel--;
          result +=
            indentationLevel < 0
              ? `\n}`
              : `\n${INDENTATION.repeat(indentationLevel)}}`;
        } else {
          result += char;
        }
      }
    }
  });
  return result;
};
