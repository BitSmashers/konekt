function Game() {
}


Game.prototype.create = function () {
  this.input.onDown.add(this.onInputDown, this);

  nodes = this.game.add.group()

  FREE = 1
  LINKING = 2

  cursorStatus = FREE
  prevNode = null
  cursorLine = null

  lines = []

  var e = new Engine()
  e.update()

  cursorNode = this.game.add.sprite(100, 100, 'node')
  cursorNode.anchor.set(0.5)

};

Game.prototype.update = function () {
};

Game.prototype.snap = function (v) {
  return v - v % 20
}

Game.prototype.render = function () {
  if(cursorStatus == LINKING) {
    //console.log(this.input.x)
    cursorLine.end.set(
      this.snap(this.input.x),
      this.snap(this.input.y)
    )
  }

  cursorNode.position.set(
    this.snap(this.input.x),
    this.snap(this.input.y)
  )

  for(var l in lines) {
    this.game.debug.geom(lines[l])
  }

  this.game.debug.geom(cursorLine)
};

Game.prototype.addNode = function (x, y) {
  var n = nodes.create(x, y, 'node')
  n.anchor.set(0.5)

  return n
}

Game.prototype.renderCell = function (x, y, size) { size = size || 20 }

Game.prototype.onInputDown = function (e) {
  //console.log(e)
  //
  var x = this.snap(e.x)
  var y = this.snap(e.y)
  var newNode = this.addNode(x, y)

  //console.log(cursorStatus)
  if(cursorStatus == FREE) {
    prevNode = newNode
    cursorStatus = LINKING

    cursorLine = new Phaser.Line(x, y, x, y)

  } else if ( cursorStatus == LINKING) {
    console.log( cursorLine.start.x, cursorLine.start.y, cursorLine.end.x, cursorLine.end.y)
    lines.push(new Phaser.Line(cursorLine.start.x, cursorLine.start.y, cursorLine.end.x, cursorLine.end.y))
    cursorStatus = FREE
  }


};

module.exports = Game;
