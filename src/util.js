const Konva = require('konva');

exports.getTextLayout = function(label, style, stepValueFontType) {
  const labels = label.split('|||');
  const opt = Object.assign({}, style, { x: 0, y: 0, text: labels[0] });
  const t = new Konva.Text(opt);
  let width = t.getWidth();
  let height = t.getHeight();
  for (let i = 1; i < labels.length; i++) {
    const option = Object.assign({}, stepValueFontType, {
      x: 0,
      y: 0,
      text: labels[i]
    });
    const t = new Konva.Text(option);
    width = Math.max(t.getWidth(), width);
    height = height + t.getHeight() - 52;
  }
  return { width, height };
};
