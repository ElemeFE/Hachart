const test = require('ava');
const compiler = require('../src/compiler.js');

test('output struct success', t => {
  const output = compiler(`
    type Arrow struct {
      "type": "arrow",
      "test": "test"
    }
  `);
  t.deepEqual(output, {
    nodes: {},
    arrows: [],
    types: {
      deafultShape: {
        fill: '#3ab882',
        cornerRadius: 10,
        maxWidth: 180,
        fontType: {
          fontSize: 16,
          fontFamily: 'Roboto',
          padding: 20,
          fill: '#fff',
          fontStyle: 'bold',
          align: 'center'
        }
      },
      defaultAnnotation: {
        fill: '#fff',
        fontType: {
          fontSize: 16,
          fontFamily: 'Roboto',
          padding: 5,
          fill: '#8699a3',
          fontStyle: 'bold',
          align: 'center'
        }
      },
      defaultFontType: {
        fontSize: 16,
        fontFamily: 'Roboto',
        fill: '#fff',
        fontStyle: 'bold',
        align: 'center',
        padding: 20
      },
      defaultArrow: {
        stroke: '#8699a3',
        strokeWidth: 3,
        lineCap: 'round',
        lineJoin: 'round'
      },
      Arrow: {
        type: 'arrow',
        test: 'test'
      }
    }
  });
});

test('output struct extend success', t => {
  const output = compiler(
    `
    type Condition struct {
      "extend": "deafultShape",
      "color": "yellow"
    }
  `,
    { type: { deafultShape: { width: '100' } } }
  );
  t.deepEqual(output, {
    nodes: {},
    arrows: [],
    types: {
      deafultShape: {
        width: '100'
      },
      defaultAnnotation: {
        fill: '#fff',
        fontType: {
          fontSize: 16,
          fontFamily: 'Roboto',
          padding: 5,
          fill: '#8699a3',
          fontStyle: 'bold',
          align: 'center'
        }
      },
      defaultFontType: {
        fontSize: 16,
        fontFamily: 'Roboto',
        fill: '#fff',
        fontStyle: 'bold',
        align: 'center',
        padding: 20
      },
      defaultArrow: {
        stroke: '#8699a3',
        strokeWidth: 3,
        lineCap: 'round',
        lineJoin: 'round'
      },
      Condition: {
        width: '100',
        extend: 'deafultShape',
        color: 'yellow'
      }
    }
  });
});

test('output struct extend success', t => {
  const output = compiler(`
    type deafultShape struct {
      "extend": "deafultShape",
      "color": "yellow"
    }
  `);

  t.deepEqual(output, {
    nodes: {},
    arrows: [],
    types: {
      deafultShape: {
        fill: '#3ab882',
        cornerRadius: 10,
        maxWidth: 180,
        fontType: {
          fontSize: 16,
          fontFamily: 'Roboto',
          padding: 20,
          fill: '#fff',
          fontStyle: 'bold',
          align: 'center'
        },
        extend: 'deafultShape',
        color: 'yellow'
      },
      defaultAnnotation: {
        fill: '#fff',
        fontType: {
          fontSize: 16,
          fontFamily: 'Roboto',
          padding: 5,
          fill: '#8699a3',
          fontStyle: 'bold',
          align: 'center'
        }
      },
      defaultFontType: {
        fontSize: 16,
        fontFamily: 'Roboto',
        fill: '#fff',
        fontStyle: 'bold',
        align: 'center',
        padding: 20
      },
      defaultArrow: {
        stroke: '#8699a3',
        strokeWidth: 3,
        lineCap: 'round',
        lineJoin: 'round'
      }
    }
  });
});

test('output struct extend success', t => {
  const opt = {
    type: {
      deafultShape: {
        fill: 'green',
        stroke: 'black',
        strokeWidth: '4',
        width: '80',
        height: '80'
      }
    }
  };
  const output = compiler(
    `
    type Condition struct {
        "extend": "deafultShape",
        "color": "yellow"
    }

    type Arrow struct {
      "type": "arrow",
      "test": "test"
    }
    def start("start")
      () -> cond1
    end

    def cond1("big than 1?")
      ("yes") -> mid1
      :Arrow("no") -> mid2
    end

    def mid1("mid")
      :Arrow() -> close
    end

    def mid2:Condition("mid2")
      () -> close
    end

    def close("close")
    end
  `,
    opt
  );
  t.deepEqual(output, {
    nodes: {
      start: {
        string: 'start',
        type: 'deafultShape'
      },
      cond1: {
        string: 'big than 1?',
        type: 'deafultShape'
      },
      mid1: {
        string: 'mid',
        type: 'deafultShape'
      },
      mid2: {
        string: 'mid2',
        type: 'Condition'
      },
      close: {
        string: 'close',
        type: 'deafultShape'
      }
    },
    arrows: [
      {
        from: 'start',
        to: 'cond1',
        string: null,
        type: 'defaultArrow'
      },
      {
        from: 'cond1',
        to: 'mid1',
        string: 'yes',
        type: 'defaultArrow'
      },
      {
        from: 'cond1',
        to: 'mid2',
        string: 'no',
        type: 'Arrow'
      },
      {
        from: 'mid1',
        to: 'close',
        string: null,
        type: 'Arrow'
      },
      {
        from: 'mid2',
        to: 'close',
        string: null,
        type: 'defaultArrow'
      }
    ],
    types: {
      deafultShape: {
        fill: 'green',
        stroke: 'black',
        strokeWidth: '4',
        width: '80',
        height: '80'
      },
      defaultAnnotation: {
        fill: '#fff',
        fontType: {
          fontSize: 16,
          fontFamily: 'Roboto',
          padding: 5,
          fill: '#8699a3',
          fontStyle: 'bold',
          align: 'center'
        }
      },
      defaultFontType: {
        fontSize: 16,
        fontFamily: 'Roboto',
        fill: '#fff',
        fontStyle: 'bold',
        align: 'center',
        padding: 20
      },
      defaultArrow: {
        stroke: '#8699a3',
        strokeWidth: 3,
        lineCap: 'round',
        lineJoin: 'round'
      },
      Condition: {
        fill: 'green',
        stroke: 'black',
        strokeWidth: '4',
        width: '80',
        height: '80',
        extend: 'deafultShape',
        color: 'yellow'
      },
      Arrow: {
        type: 'arrow',
        test: 'test'
      }
    }
  });
});
