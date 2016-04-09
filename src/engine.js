function Engine() {}
Engine.prototype.update = function () {
  console.log("update")
}

Engine.prototype.cell = function () {
  return {
    key: "value",
    "otherKey": ["this", "is", "an", "arraY"],
    anObj : { aKey : 12, b: "dd"}
  }
}

module.exports = Engine;
