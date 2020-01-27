const test = require('ava');
const tokenizer = require('../src/tokenizer.js');

test('tokenize Word success', t => {
  const token = tokenizer('  word  ');
  t.deepEqual(token, [{ type: 'Word', value: 'word' }]);
});

test('tokenize Word success', t => {
  const token = tokenizer('  endTest ');
  t.deepEqual(token, [{ type: 'Word', value: 'endTest' }]);
});

test('tokenize String success', t => {
  const token = tokenizer(' "word"  ');
  t.deepEqual(token, [{ type: 'String', value: 'word' }]);
});

test('tokenize Operator success', t => {
  const token = tokenizer(' = ');
  t.deepEqual(token, [{ type: 'Operator', value: '=' }]);
});

test('tokenize Json success', t => {
  const token = tokenizer(`
    {
      "test": "test}",
      "haha": {"in": "in"}
    }
  `);
  t.deepEqual(token, [
    {
      type: 'Json',
      value: {
        test: 'test}',
        haha: { in: 'in' }
      }
    }
  ]);
});

test('tokenize keyword success', t => {
  const token = tokenizer('   end');
  t.deepEqual(token, [{ type: 'Keyword', value: 'end' }]);
});

test('tokenize keyword success', t => {
  const token = tokenizer('   end  ');
  t.deepEqual(token, [{ type: 'Keyword', value: 'end' }]);
});

test('tokenize json success', t => {
  const token = tokenizer(`
    type Blank struct {
      "extend": "deafultShape",
      "fill": "#000",
      "fontType": {
        "fontSize": 16,
        "fontFamily": "Roboto",
        "fill": "#fff",
        "fontStyle": "bold",
        "align": "center"
      }
    }
  `);
  t.deepEqual(token, [
    {
      type: 'Keyword',
      value: 'type'
    },
    {
      type: 'Word',
      value: 'Blank'
    },
    {
      type: 'Keyword',
      value: 'struct'
    },
    {
      value: {
        extend: 'deafultShape',
        fill: '#000',
        fontType: {
          fontSize: 16,
          fontFamily: 'Roboto',
          fill: '#fff',
          fontStyle: 'bold',
          align: 'center'
        }
      },
      type: 'Json'
    }
  ]);
});

test('tokenize struct success', t => {
  const token = tokenizer(`
    type condition struct {
        "type": "status",
        "color": "yellow",
        "max-width": 100,
        "max-hight": 200,
        "font-size": "20px",
        "back-ground-color": "black"
    }
  `);
  t.deepEqual(token, [
    { type: 'Keyword', value: 'type' },
    { type: 'Word', value: 'condition' },
    { type: 'Keyword', value: 'struct' },
    {
      value: {
        type: 'status',
        color: 'yellow',
        'max-width': 100,
        'max-hight': 200,
        'font-size': '20px',
        'back-ground-color': 'black'
      },
      type: 'Json'
    }
  ]);
});

test('tokenize keyword success', t => {
  const token = tokenizer(`
    def start("start")
      () -> cond
    end
  `);
  t.deepEqual(token, [
    {
      type: 'Keyword',
      value: 'def'
    },
    {
      type: 'Word',
      value: 'start'
    },
    {
      value: '(',
      type: 'Operator'
    },
    {
      type: 'String',
      value: 'start'
    },
    {
      value: ')',
      type: 'Operator'
    },
    {
      value: '(',
      type: 'Operator'
    },
    {
      value: ')',
      type: 'Operator'
    },
    {
      value: '->',
      type: 'Operator'
    },
    {
      type: 'Word',
      value: 'cond'
    },
    {
      type: 'Keyword',
      value: 'end'
    }
  ]);
});

test('tokenize keyword success', t => {
  const token = tokenizer(`
    def start:Condition("start")
      :Arrow("yes") -> cond
    end
  `);
  t.deepEqual(token, [
    {
      type: 'Keyword',
      value: 'def'
    },
    {
      type: 'Word',
      value: 'start'
    },
    {
      value: ':',
      type: 'Operator'
    },
    {
      type: 'Word',
      value: 'Condition'
    },
    {
      value: '(',
      type: 'Operator'
    },
    {
      type: 'String',
      value: 'start'
    },
    {
      value: ')',
      type: 'Operator'
    },
    {
      value: ':',
      type: 'Operator'
    },
    {
      type: 'Word',
      value: 'Arrow'
    },
    {
      value: '(',
      type: 'Operator'
    },
    {
      type: 'String',
      value: 'yes'
    },
    {
      value: ')',
      type: 'Operator'
    },
    {
      value: '->',
      type: 'Operator'
    },
    {
      type: 'Word',
      value: 'cond'
    },
    {
      type: 'Keyword',
      value: 'end'
    }
  ]);
});
