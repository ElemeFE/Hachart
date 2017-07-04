const draw = require('./draw.js');
const Konva = require('konva');

class Container {
  constructor({containerID}) {
    this.stage = new Konva.Stage({container: containerID});
  }

  draw(input) {
    this.clear();
    draw(this.stage, input);
  }

  clear() {
    this.stage.destroyChildren();
  }

  destroy() {
    this.stage.destroy();
  }
}

module.exports = Container;
