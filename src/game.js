function Game() {
}


Game.prototype.create = function () {
  this.input.onDown.add(this.onInputDown, this);
  console.log()
    var e = new Engine()
  e.update()
};

Game.prototype.update = function () {
};

Game.prototype.render = function () {
};

Game.prototype.onInputDown = function () {


};

module.exports = Game;
