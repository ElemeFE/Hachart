const { getTextLayout } = require('./util.js');

const autoWidth = function(label, fontType, stepValueFontType, maxWidth) {
  let { width, height } = getTextLayout(label, fontType, stepValueFontType);
  if (maxWidth) {
    if (width > maxWidth) {
      fontType.width = maxWidth;
      stepValueFontType.width = maxWidth;
      return autoWidth(label, fontType, stepValueFontType);
    }
  }
  return { width, height, fontType, stepValueFontType };
};

module.exports = function(input) {
  const { nodes, arrows, types } = input;
  const newNodes = {};
  const newArrows = {};
  const defaultFontType = types['defaultFontType'];
  for (let name of Object.keys(nodes)) {
    const node = nodes[name];
    const type = types[node.type];
    const { string } = node;
    const f = Object.assign({}, defaultFontType, type.fontType);
    const { width, height, fontType, stepValueFontType } = autoWidth(
      string,
      f,
      type.stepValueFontType,
      type.maxWidth
    );
    delete fontType.width;
    delete stepValueFontType.width;
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
