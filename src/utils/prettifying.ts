function fixBrackets(query: string): string {
  let openBrackets = 0;
  let closeBrackets = 0;
  const stack: string[] = [];

  for (let i = 0; i < query.length; i++) {
    const char = query[i];

    if (char === '{') {
      openBrackets++;
      stack.push('{');
    } else if (char === '}') {
      closeBrackets++;

      if (stack.length > 0 && stack[stack.length - 1] === '{') {
        stack.pop();
      }
    }
  }

  const bracketDifference = openBrackets - closeBrackets;

  if (bracketDifference > 0) {
    /* добавляются закрывающие скобки, если открытых больше -
    можно убрать если поведение непредсказуемое, и например просто выделять лишниие скобки как ошибки*/
    query += '}'.repeat(bracketDifference);
  } else if (bracketDifference < 0) {
    // добавляются открывающие скобки, если закрытых больше - аналогично можно убрать
    query = '{'.repeat(Math.abs(bracketDifference)) + query;
  }

  return query;
}

const formatGraphQLQuery = (query: string): string => {
  let result = '';
  let indentationLevel = 0;
  const indentation = '  ';

  const fixedQuery = fixBrackets(query);

  const lines = fixedQuery.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.length === 0) {
      continue;
    }

    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '{') {
        result += `${char}\n`;
        indentationLevel++;
        result += indentation.repeat(indentationLevel);
      } else if (char === '}') {
        indentationLevel--;
        result += `\n${indentation.repeat(indentationLevel)}}`;
      } else {
        result += char;
      }
    }
    if (line[line.length - 1] !== '{' && line[line.length - 1] !== '}') {
      result += `\n${indentation.repeat(indentationLevel)}`;
    }
  }

  return result.trim();
};

export default formatGraphQLQuery;
