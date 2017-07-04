const dagre = require('dagre');
const formater = require('./formater.js');

const {getTextLayout} = require('./util.js');

const getCenterPoint = function(points) {
  const len = points.length;
  let center = parseInt(len / 2, 10);
  return points[center];
};

const layoutLabel = function({label, point}, type) {
  const {width, height} = getTextLayout(label, type);
  const {x, y} = point;
  return {
    x,
    y,
    height,
    width,
    label
  };
};

module.exports = function(input, opt = {}) {
  const g = new dagre.graphlib.Graph({ directed: true, rankdir: 'LR'});
  g.setGraph(opt);
  g.setDefaultEdgeLabel(function() { return {}; });
  const {nodes, arrows, types} = formater(input);
  for (let name of Object.keys(nodes)) {
    const node = nodes[name];
    g.setNode(name, node);
  }
  for (let k of Object.keys(arrows)) {
    const a = arrows[k];
    a.string ? g.setEdge(a.from, a.to, { label: a.string }) : g.setEdge(a.from, a.to);
  }
  dagre.layout(g);
  const nodesInfo = {};
  const arrowsInfo = [];
  const labelInfo = [];
  g.nodes().forEach(n => {
    nodesInfo[n] = g.node(n);
  });
  const annotation = types['defaultAnnotation'];
  g.edges().forEach(e => {

    const key = `${e.v}->${e.w}`;
    const edge = g.edge(e);
    if (edge.label) {
      labelInfo.push(layoutLabel({
        label: edge.label,
        point: getCenterPoint(edge.points)
      }, annotation.fontType));
    }
    arrowsInfo.push(Object.assign(arrows[key], edge));
  });
  const container = g._label;
  return {
    container,
    nodesInfo,
    arrowsInfo,
    labelInfo,
    types
  };
};
