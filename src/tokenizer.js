const KEY_WORD = ['type', 'struct', 'var', 'def', 'end'];
const WORD = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-';
const OPERATORS = ['=', '(', ')', '->', ':'];

module.exports = function(str) {
  let index = 0;
  const tokens = [];

  const throwError = function(m) {
    const msg = `
    at: ${index}
    ${str.slice(index - 5, index + 5)}
    ${'     '}^
    ${m}
    `;
    throw new Error(msg);
  };

  const next = function(word) {
    word.split('').map(w => {
      if (str[index] !== w) {
        throwError(`parse struct expect ${w}, but find ${str[index]}`);
      }
      index++;
    });
  };

  const isEnd = function() {
    return index >= str.length;
  };

  const space = function() {
    while ((str[index] === ' ' || str[index] === '\n') && !isEnd()) {
      index++;
    }
    return index;
  };

  const basicParseString = function(stop) {
    const start = index;
    while (!isEnd() && !stop(str[index])) {
      index++;
    }
    const s = str.slice(start, index);
    return s;
  };

  const isString = function() {
    return str[index] === '"';
  };

  const parseString = function() {
    next('"');
    let s = '';
    s = basicParseString((w) => w === '"');
    next('"');
    return s;
  };

  const string = function() {
    const s = parseString();
    return {
      type: 'String',
      value: s
    };
  };

  const isWord = function(w) {
    return WORD.indexOf(w) >= 0;
  };

  const isKeyword = function(word) {
    for (let w of KEY_WORD) {
      if (word === w) {
        return true;
      }
    }
    return false;
  };

  const parseWord = function() {
    let w = '';
    w = basicParseString((w) => !isWord(w));
    return w;
  };

  const word = function() {
    const w = parseWord();
    let type = 'Word';
    if (isKeyword(w)) {
      type = 'Keyword';
    }
    return {
      type,
      value: w
    };
  };

  const isStruct = function() {
    return str[index] === '{';
  };

  const struct = function() {
    const start = index;
    next('{');
    let inString = false;
    let left = 0;
    let right = 0;
    while (!(str[index] === '}' && !inString && left === right) && !isEnd()) {
      if (str[index] === '"') inString = !inString;
      if (str[index] === '{' && !inString) left++;
      if (str[index] === '}' && !inString) right++;
      index++;
    }
    next('}');
    const s = str.slice(start, index);
    const j = JSON.parse(s);
    return {
      value: j,
      type: 'Json'
    };
  };

  const isOperator = function() {
    for (let op of OPERATORS) {
      const compareOpt = str.slice(index, index + op.length);
      if (op === compareOpt) {
        return true;
      }
    }
    return false;
  };

  const operator = function() {
    let op = null;
    for (let _op of OPERATORS) {
      const compareOpt = str.slice(index, index + _op.length);
      if (_op === compareOpt) {
        op = _op;
      }
    }
    index = index + op.length;
    return {
      value: op,
      type: 'Operator'
    };
  };

  const parseToken = function() {
    switch (true) {
      case isOperator():
        return operator();
      case isStruct():
        return struct();
      case isString():
        return string();
      case isWord(str[index]):
        return word();
      default:
        throwError('unknow str');
    }
  };

  while (!isEnd()) {
    space();
    const t = parseToken(str, index);
    tokens.push(t);
    space();
  }

  return tokens;
};
