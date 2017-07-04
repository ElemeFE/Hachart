const Konva = require('konva');

exports.getTextLayout = function(label, style) {
  const opt = Object.assign({}, style, {x: 0, y: 0, text: label});
  const t = new Konva.Text(opt);
  const width = t.getWidth();
  const height = t.getHeight();
  return {width, height};
};
