module.exports = function(ast, opt = {}) {
  const { type = {} } = opt;
  type.defaultArrow = type.defaultArrow || {};
  type.deafultShape = type.deafultShape || {};
  const _global = type;
  const nodes = {};
  let arrows = [];
  let types = {};
  const Body = function(body) {
    switch (body.type) {
      case 'Struct':
        return Struct(body);
      case 'StatusExpression':
        return StatusExpression(body);
      default:
        throw new Error(`unknow ast body ${JSON.stringify(body)}`);
    }
  };

  const Struct = function({name, value}) {
    value = filterValue(value);
    types[name] = value;
  };

  const filterValue = function(value) {
    for (let k of Object.keys(value)) {
      const v = value[k];
      if (k === 'extend') {
        if (_global[v] === undefined) {
          throw new Error(`extend ${v} not find.`);
        }
        const cpv = Object.assign({}, _global[v]);
        value = Object.assign(cpv, value);
        break;
      }
    }
    return value;
  };

  const StatusExpression = function(statusExpression) {
    const {name, typing, string, expressions} = statusExpression;
    const type = typing.value || 'deafultShape';
    const a = Expressions(expressions).map(e => {
      const {string, type} = e;
      return {
        from: name,
        to: e.name,
        string,
        type
      };
    });
    arrows = arrows.concat(a);
    const node = {
      string,
      type
    };
    nodes[name] = node;
  };

  const Expressions = function(expressions) {
    return expressions.map(e => {
      const {typing, string, value} = e;
      const type = typing.value || 'defaultArrow';
      return {
        name: value,
        string,
        type
      };
    });
  };
  ast.body.map(b => Body(b));
  types = Object.assign(_global, types);
  return {
    nodes,
    arrows,
    types
  };
};
