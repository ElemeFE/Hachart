const Konva = require('konva');

exports.getTextLayout = function(label, style, stepValueFontType) {
  const labels = label.split('|||');
  const opt = Object.assign({}, style, { x: 0, y: 0, text: labels[0] });
  const t = new Konva.Text(opt);
  const width = t.getWidth();
  let height = t.getHeight();
  for (let i = 1; i < labels.length; i++) {
    const opt = Object.assign({}, stepValueFontType, {
      x: 0,
      y: 0,
      text: labels[i],
      width: width
    });
    const t = new Konva.Text(opt);
    height = height + t.getHeight() - 52;
  }
  return { width, height };
};
