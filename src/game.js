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
  //cursorNode.anchor.set(0.5)
  cursorNode.tint = 0xffaaff
  cursorNode.visible = false

  keys = this.game.input.keyboard.addKeys({
    'node': Phaser.KeyCode.N
  })

  keys.node.onDown.add(this.togglePutNode, this)

};

Game.prototype.update = function () {
};

Game.prototype.snap = function (v) {
  return v - v % GRID_SIZE
}

Game.prototype.toGraphCoord = function (v) {
  return this.snap(v) / GRID_SIZE
}

Game.prototype.togglePutNode = function() {
  if(keys.node.isDown) {
    if(cursorStatus == FREE) {
      cursorStatus = PUT_NODE
        cursorNode.visible = true
    } else if(cursorStatus == PUT_NODE) {
      cursorStatus = FREE
        cursorNode.visible = false
    }
  }
}

Game.prototype.render = function () {

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

  }

  for(var l in lines) {
    this.game.debug.geom(lines[l])
  }

  this.game.debug.geom(cursorLine)
};

Game.prototype.addNode = function (x, y) {

  var n = nodes.create(x, y, 'node')
  n.anchor.set(0.5)

  engine.createNode(this.toGraphCoord(x), this.toGraphCoord(y))
  console.log(engine.nodeExists(this.toGraphCoord(x), this.toGraphCoord(y)))

  return n
}

Game.prototype.renderCell = function (x, y, size) { size = size || 20 }

Game.prototype.onInputDown = function (e) {

  if(cursorStatus == FREE) {
    console.log(e, this)
    if(engine.nodeExists(this.toGraphCoord(e.x), this.toGraphCoord(e.y)))
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
