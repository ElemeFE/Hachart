const tokenizer = require('../src/tokenizer.js');
const parser = require('../src/parser.js');
const test = require('ava');

test('parse struct success', t => {
  const token = tokenizer(`
    type condition struct {
        "type": "status",
        "color": "yellow",
        "max-width": "100px",
        "max-hight": "200px",
        "font-size": "20px",
        "back-ground-color": "black"
    }
    `);
  const ast = parser(token);
  t.deepEqual(ast, {
    'type': 'Program',
    'body': [
      {
        'type': 'Struct',
        'name': 'condition',
        'value': {
          'type': 'status',
          'color': 'yellow',
          'max-width': '100px',
          'max-hight': '200px',
          'font-size': '20px',
          'back-ground-color': 'black'
        }
      }
    ]
  });
});

test('parse basic StatusExpression success', t => {
  const token = tokenizer(`
      def cond("cond1")
        () -> mid1
      end
    `);
  const ast = parser(token);
  t.deepEqual(ast, {
    'type': 'Program',
    'body': [
      {
        'name': 'cond',
        'typing': {
          'type': 'type',
          'value': null
        },
        'string': 'cond1',
        'expressions': [
          {
            'type': 'Expression',
            'typing': {
              'type': 'type',
              'value': null
            },
            'string': null,
            'value': 'mid1'
          }
        ],
        'type': 'StatusExpression'
      }
    ]
  });
});

test('parse no Expression success', t => {
  const token = tokenizer(`
      def close("close")
      end
    `);
  const ast = parser(token);
  t.deepEqual(ast, {
    'type': 'Program',
    'body': [
      {
        'name': 'close',
        'typing': {
          'type': 'type',
          'value': null
        },
        'string': 'close',
        'expressions': [],
        'type': 'StatusExpression'
      }
    ]
  });
});

test('parse Type Expression success', t => {
  const token = tokenizer(`
      def mid2:Condition("mid2")
        () -> close
      end
    `);
  const ast = parser(token);
  t.deepEqual(ast, {
    'type': 'Program',
    'body': [
      {
        'name': 'mid2',
        'typing': {
          'type': 'type',
          'value': 'Condition'
        },
        'string': 'mid2',
        'expressions': [
          {
            'type': 'Expression',
            'typing': {
              'type': 'type',
              'value': null
            },
            'string': null,
            'value': 'close'
          }
        ],
        'type': 'StatusExpression'
      }
    ]
  });
});

test('parse mutil Expression with type success', t => {
  const token = tokenizer(`
      def cond1("big than 1?")
        ("yes") -> mid1
        :Arrow("no") -> mid2
      end
    `);
  const ast = parser(token);
  t.deepEqual(ast, {
    'type': 'Program',
    'body': [
      {
        'name': 'cond1',
        'typing': {
          'type': 'type',
          'value': null
        },
        'string': 'big than 1?',
        'expressions': [
          {
            'type': 'Expression',
            'typing': {
              'type': 'type',
              'value': null
            },
            'string': 'yes',
            'value': 'mid1'
          },
          {
            'type': 'Expression',
            'typing': {
              'type': 'type',
              'value': 'Arrow'
            },
            'string': 'no',
            'value': 'mid2'
          }
        ],
        'type': 'StatusExpression'
      }
    ]
  });
});
