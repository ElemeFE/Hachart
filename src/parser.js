module.exports = function(tokens) {
  let index = 0;

  const body = function() {
    switch (true) {
      case isStruct():
        return struct();
      case isStatusExpression():
        return statusExpression();
      default:
        throw new Error(`unknow token ${JSON.stringify(token())}`);
    }
  };

  const expect = function({value = null, type = null}) {
    if (!value && !type) {
      throw new Error('eat lack of params value and type');
    }
    const t = token();
    if (!t) {
      return false;
    }
    if (value) {
      if (t.value !== value) {
        throw new Error(`parse token value error: expect ${value}, but${t.value}`);
      }
    }

    if (type) {
      if (t.type !== type) {
        throw new Error(`parse token value error: expect ${type}, but${t.type}`);
      }
    }
    return true;
  };

  const eat = function({value = null, type = null}) {
    if (!value && !type) {
      throw new Error('eat lack of params value and type');
    }
    const t = token();
    if (!t) {
      return false;
    }
    if (value) {
      if (t.value !== value) {
        return false;
      }
    }

    if (type) {
      if (t.type !== type) {
        return false;
      }
    }
    return true;
  };

  const next = function(t) {
    expect(t);
    index++;
  };

  const token = function() {
    return tokens[index];
  };

  const isStatusExpression = function() {
    return eat({type: 'Keyword', value: 'def'});
  };
  const statusExpression = function() {
    next({type: 'Keyword', value: 'def'});
    const name = token().value;
    next({type: 'Word'});
    const typing = type();
    next({type: 'Operator', value: '('});
    const string = token().value;
    next({type: 'String'});
    next({type: 'Operator', value: ')'});
    const expressions = Expressions();
    next({type: 'Keyword', value: 'end'});
    return {
      name,
      typing,
      string,
      expressions,
      type: 'StatusExpression'
    };
  };

  const type = function() {
    let value = null;
    if (eat({type: 'Operator', value: ':'})) {
      next({type: 'Operator', value: ':'});
      value = token().value;
      next({type: 'Word'});
    }
    return {
      type: 'type',
      value
    };
  };
  const Expressions = function() {
    let expressions = [];
    while (!eat({type: 'Keyword', value: 'end'})) {
      expressions.push(Expression());
    }
    return expressions;
  };

  const Expression = function() {
    const typing = type();
    next({type: 'Operator', value: '('});
    let string = null;
    if (eat({type: 'String'})) {
      string = token().value;
      index++;
    }
    next({type: 'Operator', value: ')'});
    next({type: 'Operator', value: '->'});

    const value = token().value;
    next({type: 'Word'});
    return {
      type: 'Expression',
      typing,
      string,
      value
    };
  };

  const isStruct = function() {
    return eat({type: 'Keyword', value: 'type'});
  };

  const struct = function() {
    next({value: 'type', type: 'Keyword'});
    const name = token().value;
    next({type: 'Word'});
    next({type: 'Keyword', value: 'struct'});
    const value = token().value;
    next({type: 'Json'});
    return {
      type: 'Struct',
      name,
      value
    };
  };

  const node = {
    type: 'Program',
    body: []
  };
  while (index < tokens.length) {
    node.body.push(body());
  }
  return node;
};
