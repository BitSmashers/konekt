function Game() {}

Game.prototype.create = function () {
  this.input.onDown.add(this.onInputDown, this);
};

Game.prototype.update = function () {

  var struct = {
    key: "value",
    otherKey: ["this", "is", "an, "arraY"],
    anObj : { aKey : 12, b: "dd"}
  }

};

Game.prototype.render = function () {
};

Game.prototype.onInputDown = function () {


};

module.exports = Game;
