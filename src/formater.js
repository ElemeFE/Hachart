const {getTextLayout} = require('./util.js');

const autoWidth = function(label, fontType, maxWidth) {
  let {width, height} = getTextLayout(label, fontType);
  if (maxWidth) {
    if (width > maxWidth) {
      fontType.width = maxWidth;
      return autoWidth(label, fontType);
    }
  }
  return {width, height, fontType};
};

module.exports = function(input) {
  const {nodes, arrows, types} = input;
  const newNodes = {};
  const newArrows = {};
  const defaultFontType = types['defaultFontType'];
  for (let name of Object.keys(nodes)) {
    const node = nodes[name];
    const type = types[node.type];
    const {string} = node;
    const f = Object.assign({}, defaultFontType, type.fontType);
    const {width, height, fontType} = autoWidth(string, f, type.maxWidth);
    delete fontType.width;
    type.fontType = fontType;
    node.width = type.width || width;
    node.height = type.height || height;
    newNodes[name] = node;
  }

  for (let a of arrows) {
    const key = `${a.from}->${a.to}`;
    newArrows[key] = a;
  }
  return {
    nodes: newNodes,
    arrows: newArrows,
    types
  };
};
