function Game() {
}


Game.prototype.create = function () {
  this.input.onDown.add(this.onInputDown, this);
  e = Engine()
  e.update()
};

Game.prototype.update = function () {
  e.update
};

Game.prototype.render = function () {
};

Game.prototype.onInputDown = function () {


};

module.exports = Game;
