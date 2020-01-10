const Konva = require('konva');

module.exports = function(stage, input) {
  const {width, height} = input.container;
  stage.setWidth(width);
  stage.height(height);
  const layer = new Konva.Layer();
  const Text = function(x, y, width, height, label, style) {
    const opt = Object.assign({}, style, {text: label, width, x, y});
    const text = new Konva.Text(opt);
    layer.add(text);
    return text;
  };

  const Box = function(centerX, centerY, width, height, label, style) {
    const x = centerX - width / 2;
    const y = centerY - height / 2;
    const opt = Object.assign({}, style, {x, y, width, height});
    var rect = new Konva.Rect(opt);
    layer.add(rect);
    
    labels = label.split("|||")

    let text_y_position = y
    let box_y_position = y

    for (let index = 0; index < labels.length; index++) {
      let font_style = index > 0 ? style.stepValueFontType : style.fontType
      let label_node = Text(
        x,
        text_y_position,
        width,
        height,
        labels[index],
        font_style
      )
      const text_height = label_node.height()
      text_y_position += text_height - style.fontType.padding * 2.5
    }
  };

  const Line = function(a, type) {
    const points = [];
    a.points.map(p => {
      points.push(p.x, p.y);
    });
    const shortPoints = shortLine(points);
    const opt = Object.assign({}, type, {points: shortPoints});
    const line = new Konva.Line(opt);
    layer.add(line);
    const arrowPoints = points.slice(points.length - 4, points.length);
    const arrow = new Konva.Arrow({
      x: 0,
      y: 0,
      points: arrowPoints,
      pointerLength: type.strokeWidth * 3,
      pointerWidth: type.strokeWidth * 3,
      fill: type.stroke
    });
    layer.add(arrow);
  };

  const shortLine = function(oldPoints, k = 0.8) {
    let points = oldPoints.slice();
    let [x1, y1, x2, y2] = points.splice(points.length - 4, points.length);
    x2 = (x2 - x1) * k + x1;
    y2 = (y2 - y1) * k + y1;
    points = points.concat([x1, y1, x2, y2]);
    return points;
  };

  const {nodesInfo, labelInfo, arrowsInfo, types} = input;

  for (let a of arrowsInfo) {
    const type = types[a.type];
    Line(a, type);
  }
  for (let l of labelInfo) {
    const {x, y, width, height, label} = l;
    const type = types['defaultAnnotation'];
    Box(x, y, width, height, label, type);
  }

  for (let name of Object.keys(nodesInfo)) {
    const node = nodesInfo[name];
    const type = types[node.type];
    const {width, height, x, y, string} = node;
    Box(x, y, width, height, string, type);
  }
  stage.add(layer);
};
