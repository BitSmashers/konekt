function Engine() {
  console.log("init engine")

  this.map = new Array()
  this.map = new Array()
  this.x_len = 10
  this.y_len = 20

  this.initMap()
}

//Init cells
Engine.prototype.initMap = function () {
  for (var x = 0 ; x< this.x_len ; x++){
        this.map[x] = new Array()
      for (var y = 0 ; y< this.y_len ; y++){
        this.map[x][y] = this.createCell(x,y)
      }
  }
}

Engine.prototype.update = function () {
  console.log("update")
  for (var x = 0 ; x < this.x_len ; x++){
      for (var y = 0 ; y < this.y_len ; y++){
         console.log(this.map[x][y])
      }
  }
}

Engine.prototype.nodeExists = function (x,y) {
  return this.map[x][y].hasNode
}

Engine.prototype.removeNode = function (x,y) {
    this.map[x][y].hasNode = false
}

Engine.prototype.createNode = function (x,y) {
    this.map[x][y].hasNode = true
}

// internal : return -1 if c1 if before c2, 0 if same position, 1 otherwise
Engine.prototype.compare = function (c1x, c2y , c2x, c2y){
  if(c1x < c2x){
    return -1
  } else if (c1x > c2x){
    return 1
  } else if(c1y < c2y){
      return -1
  } else if (c1y > c2y){
      return 1
  }
  return 0
}

//Create a link between the two nodes, do nothing if not possible
Engine.prototype.linkNode= function(c1x, c2y , c2x, c2y){
  if(!this.nodeExists(exist) || !this.nodeExists(exist) ){
    console.log("no node : {"+c1x+","+c2y+"} , {"+c2x+","+c2y+"}")
    return
  }
  var comp = this.compare(c1x, c2y , c2x, c2y)
  if( comp == 0){
    console.log("Error: cells on same positons")
  } else if ( comp < 1){
    this.map[c1x][c1y].links.push(this.createLink(c2x,c2y,0))
  } else{
    this.map[c2x][c2y].links.push(this.createLink(c1y,c1y,0))
  }
}

//new Link struct
Engine.prototype.createLink = function (xTo, yTo, distance) {
  return {
    "x" : xTo,
    "y" : yTo,
    "distance" : distance
  }
}


//new Cell struct
Engine.prototype.createCell = function (x,y) {
  return {
    "x" : x,
    "y" : y,
    "hasNode" : false,
    "links" : []
  }
}

//  "otherKey": ["this", "is", "an", "arraY"],
//  anObj : { aKey : 12, b: "dd"}
module.exports = Engine;
