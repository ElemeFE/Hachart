# Hachart

HaHa, this is a flowchart generator.

[online edit website](https://wangdashuaihenshuai.github.io/demo/flow-chart/)

![example](https://fuss10.elemecdn.com/7/5b/706949379f6696b335ca13c8da67epng.png)

# install

```bash
npm install ha-chart --save
```

# quick start

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>flow-draw</title>
  </head>
  <body>
    <div id="container"></div>
  </body>
</html>
```

```js
const {compiler, layout, Container} = require('ha-chart')

const code = `
type CondStyle struct{
  "extend": "deafultShape",
  "fill": "#fcb738"
}

def start("action")
  () -> cond
end

def cond:CondStyle("is 10?")
  ("yes") -> step1
  ("no") -> step2
end

def step1("step 1")
end

def step2("step 2")
end
`

const output = layout(compiler(code))
const container = new Container({containerID: "container"})
container.draw(output)
```
![example](https://fuss10.elemecdn.com/3/42/aad462d88525b6d46512110ffd3c0png.png)

# API

## compiler(code, options)

**code**

```js
//create new style, you can extends default style to create new style
type style struct{
  "extend": "deafultShape",
  "fill": "#fcb738"
}

// create a chart
def name:style("string")
  () -> nextShape
end
```

**options**

you can change the default style at compiler code using options.
```js
{
  type: {
    deafultShape: {
      fill: '#3ab882',
      cornerRadius: 10,
      maxWidth: 180,
      fontType: {
        fontSize: 16,
        fontFamily: 'Calibri',
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
        fontFamily: 'Calibri',
        padding: 5,
        fill: '#8699a3',
        fontStyle: 'bold',
        align: 'center'
      }
    },
    defaultFontType: {
      'fontSize': 16,
      'fontFamily': 'Calibri',
      'fill': '#fff',
      'fontStyle': 'bold',
      'align': 'center',
      'padding': 20
    },
    defaultArrow: {
      stroke: '#8699a3',
      strokeWidth: 3,
      lineCap: 'round',
      lineJoin: 'round'
    }
  }
}
```
draw with [konvajs](https://konvajs.github.io)

[more defaultShape and defaultAnnotation Parameters](https://konvajs.github.io/api/Konva.Arc.html)

[more defaultArrow Parameters](https://konvajs.github.io/api/Konva.Line.html)

[more default fontType parameters](https://konvajs.github.io/api/Konva.Text.html)

## layout(input, options)

**input**
```js
const input = compiler(code)
```
**options**

name | defaultValue | description
-----|---------------|------------
rankdir |	TB |	Direction for rank nodes. Can be TB, BT, LR, or RL, where T = top, B = bottom, L = left, and R = right.
align |	TB |	Alignment  for rank nodes. Can be UL, UR, DL, or DR, where U = up, D = down, L = left, and R = right.
nodesep |	50	| Number of pixels that separate nodes horizontally in the layout.
edgesep |	10	| Number of pixels that separate edges horizontally in the layout.
ranksep |	50	| Number of pixels between each rank in the layout.
marginx |	0	| Number of pixels to use as a margin around the left and right of the graph.
marginy |	0	| Number of pixels to use as a margin around the top and bottom of the graph.
acyclicer |	undefined |	If set to greedy, uses a greedy heuristic for finding a feedback arc set for a graph. A feedback arc set is a set of edges that can be removed to make a graph acyclic.
ranker |	network-simplex	| Type of algorithm to assigns a rank to each node in the input graph. Possible values: network-simplex, tight-tree or longest-path

## Container

**constructor({containerID: "string"})**

containerID: the id of document node.

**draw(input)**

draw the compiler code
