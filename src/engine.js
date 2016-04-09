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
      for (var y = 0 ; y < this.y_len ; y++){
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
        if(this.linkIntersect(this.links[i],this.links[j])){
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
Engine.prototype.linkNode= function(xA, yA , xB, yB){
  if(!this.nodeExists(xA,yA) || !this.nodeExists(xB,yB) ){
    console.log("no node : {"+xA+","+yA+"} , {"+xB+","+yB+"}")
    return
  }
  if(!this.linkExists(xA, yA , xB, yB)){
    this.links.push(this.createLink(xA, yA , xB, yB))
    this.update()
  }
}

//new Link struct
Engine.prototype.linkExists = function(xA, yA,xB, yB) {
  for(var i = 0; i<this.links.length ; i++){
    var link = this.links[i]
    if(link.coordA.x === xA && link.coordA.y === yA &&
        link.coordB.x === xB && link.coordB.y === yB ||
        link.coordB.x === xA && link.coordB.y === yA &&
        link.coordA.x === xB && link.coordA.y === yB  ){
          return true
        }
  }
  return false
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

module.exports = Engine;
