const tokenizer = require('./tokenizer.js');
const parser = require('./parser.js');
const generator = require('./generator.js');

const defaultType = {
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
  }
};

module.exports = function(str, opt = {}) {
  const type = Object.assign({}, defaultType, opt.type || {});
  opt.type = type;
  return generator(parser(tokenizer(str)), opt);
};
