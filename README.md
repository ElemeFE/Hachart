# Hachart

HaHa, this is a flowchart generator.

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
const {compiler, layout, Container} = require('Hachart')

const code = `
def start("action")
  () -> cond
end

def cond("is 10?")
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

# API
