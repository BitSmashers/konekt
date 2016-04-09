function Engine(w, h) {
  console.log("init engine")

  this.map = new Array()
  this.links = new Array()
  this.intersects = new Array()
  this.x_len = w
  this.y_len = h

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
  this.intersect = new Array()

  //n2 intersect calculation
  for (var i = 0 ; i < this.links.length ; i++){
      for (var j = 0 ; j < this.links.length ; j++){
        if(this.intersect(this.links[i],this.links[j])){
          this.intersects.push(this.createIntersect(this.links[i],this.links[j]))
        }
      }
  }
  console.log(this.intersects);
}

Engine.prototype.createIntersect = function(linkA, linkB, coord) {
  return {
    "coord" : coord,
    "linkA" : linkA,
    "linkB" : linkB
  }
}

Engine.prototype.linkIntersect = function (linkA,linkB) {
  //((Yb-Ya)/(Xb-Xa))-((Yd-Yc)/(Xd-Xc))] != 0
    var v1 = (linkA.coordB.y - linkA.coordA.y) / (linkA.coordB.x - linkA.coordA.x)
    var v2 = (linkB.coordB.y - linkB.coordA.y) / (linkB.coordB.x - linkB.coordA.x)
    return v1 - v2 != 0
}

Engine.prototype.nodeExists = function (x,y) {
  console.log(x, y)
  return this.map[x][y].hasNode
}

Engine.prototype.removeNode = function (x,y) {
    this.map[x][y].hasNode = false
}

Engine.prototype.createNode = function (x,y) {
    this.map[x][y].hasNode = true
}

Engine.prototype.getCell = function (x,y) {
    return this.map[x][y]
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
  this.links.push(this.createLink(c1x, c2y , c2x, c2y))
  // var comp = this.compare(c1x, c2y , c2x, c2y)
  // if( comp == 0){
  //   console.log("Error: cells on same positons")
  // } else if ( comp < 1){
  //   this.links[c1x][c1y].links.push(this.createLink(c2x,c2y,0))
  // } else{
  //   this.map[c2x][c2y].links.push(this.createLink(c1y,c1y,0))
  // }
}

//new Link struct
Engine.prototype.createLink = function (xA, yA,xB, yB) {
  return {
    "coordA" : {"x": xA, "y" : yA},
    "coordB" : {"x" : xB, "y" : yB},
    "distance" : 0
  }
}


//new Cell struct
Engine.prototype.createCell = function (x,y) {
  return {
    "coord" : {"x" : x, "y" : y},
    "hasNode" : false
  }
}

//  "otherKey": ["this", "is", "an", "arraY"],
//  anObj : { aKey : 12, b: "dd"}
module.exports = Engine;
