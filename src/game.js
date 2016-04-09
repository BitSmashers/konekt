function Game() {
}

Game.prototype.create = function () {
  this.input.onDown.add(this.onInputDown, this);

  nodes = this.game.add.group()

  FREE = 1
  PUT_NODE = 2
  LINKING = 3

  GRID_SIZE = 40

  cursorStatus = FREE
  cursorLine = null

  lines = []

  engine = new Engine(100, 100)
  console.log(engine)

  cursorNode = this.game.add.sprite(100, 100, 'node')
  cursorNode.anchor.set(0.5)
  cursorNode.tint = 0xffaaff
  cursorNode.visible = false

  selector = this.game.add.sprite(0, 0, 'selector')
  selector.anchor.set(0.5)
  selector.scale.set(GRID_SIZE / selector.width)

  keys = this.game.input.keyboard.addKeys({
    'node': Phaser.KeyCode.N
  })

  keys.node.onDown.add(this.togglePutNode, this)

};

Game.prototype.update = function () {
};

Game.prototype.snap = function (v) {
  return Math.round(v / GRID_SIZE) * GRID_SIZE
}

Game.prototype.fromGrid = function (v) {
  return v * GRID_SIZE + GRID_SIZE * 0.5
}

Game.prototype.toGrid = function (v) {
  return this.snap(v) / GRID_SIZE
}

Game.prototype.togglePutNode = function() {
  if(keys.node.isDown) {
    if(cursorStatus == FREE) {
      cursorStatus = PUT_NODE
      cursorNode.visible = true
      selector.visible = false

    } else if(cursorStatus == PUT_NODE) {
      cursorStatus = FREE
      cursorNode.visible = false
      selector.visible = true

    }
  }
}

Game.prototype.render = function () {
  this.game.debug.text( this.toGrid(this.input.x) + ", " + this.toGrid(this.input.y), 10, 20 )


  if(cursorStatus == PUT_NODE) {
    cursorNode.position.set(
      this.snap(this.input.x),
      this.snap(this.input.y)
    )
  } else if (cursorStatus == LINKING) {
    cursorLine.end.set(
      this.snap(this.input.x),
      this.snap(this.input.y)
    )

  } else if (cursorStatus == FREE) {
    selector.position.set(
      this.snap(this.input.x),
      this.snap(this.input.y)
    )
  }

  for(var l in lines) {
    this.game.debug.geom(lines[l])
  }

  this.game.debug.geom(cursorLine)
};

Game.prototype.addNode = function (x, y) {

  var n = nodes.create(x, y, 'node')
  n.anchor.set(0.5)

  n.scale.set(GRID_SIZE / n.width)

  engine.createNode(this.toGrid(x), this.toGrid(y))
  console.log(engine.nodeExists(this.toGrid(x), this.toGrid(y)))

  return n
}

Game.prototype.renderCell = function (x, y, size) { size = size || 20 }

Game.prototype.onInputDown = function (e) {

  if(cursorStatus == FREE) {
    console.log(e, this)
    if(engine.nodeExists(this.toGrid(e.x), this.toGrid(e.y)))
      console.log("EXISSSS")

  } else if ( cursorStatus == LINKING) {
    console.log( cursorLine.start.x, cursorLine.start.y, cursorLine.end.x, cursorLine.end.y)
    lines.push(new Phaser.Line(cursorLine.start.x, cursorLine.start.y, cursorLine.end.x, cursorLine.end.y))
    cursorStatus = FREE
  } else if(cursorStatus == PUT_NODE) {
    var x = this.snap(e.x)
    var y = this.snap(e.y)
    var newNode = this.addNode(x, y)

  }


};

module.exports = Game;
