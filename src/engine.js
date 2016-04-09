function Engine() {
  console.log("init engine")

  this.map = new Array()
  this.x_len = 10
  this.y_len = 20

  for (var x = 0 ; x< this.x_len ; x++){
        this.map[x] = new Array()
      for (var y = 0 ; y< this.y_len ; y++){
        this.map[x][y] = this.cell()
      }
  }
}

Engine.prototype.update = function () {
  console.log("update")
  for (var x = 0 ; x< this.x_len ; x++){
      for (var y = 0 ; y< this.y_len ; y++){
        console.log(this.map[x][y])
      }
  }
}

Engine.prototype.cell = function () {

  return {
    //sate
    "l_up" : false,
    "l_down" : false,
    "l_left" : false,
    "l_right" : false,
    "hasRoad" : false,

    "otherKey": ["this", "is", "an", "arraY"],
    anObj : { aKey : 12, b: "dd"}
  }
}

module.exports = Engine;
