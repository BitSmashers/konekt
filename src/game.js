function Game() {
}


Game.prototype.create = function () {
  this.input.onDown.add(this.onInputDown, this);

  nodes = this.game.add.group()

  var e = new Engine()
  e.update()

};

Game.prototype.update = function () {
};

Game.prototype.render = function () {
};

Game.prototype.addNode = function (x, y) {
  var n = nodes.create(x, y, 'node')
  n.anchor.set(0.5)
}

Game.prototype.renderCell = function (x, y, size) { size = size || 20 }

Game.prototype.onInputDown = function (e) {
  console.log(e)
  this.addNode(e.x, e.y)


};

module.exports = Game;
