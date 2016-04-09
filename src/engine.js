function Engine() {
  var length = 100
  var height = 200
  var map
  var init = false

  function init(){
    console.log("init")
  }


  return {
    update : update
  }
}

function update(){
  console.log("update")
}

function cell(){
  return {
    key: "value",
    otherKey: {"this", "is", "an", "arraY"},
    anObj : { aKey : 12, b: "dd"}
    toto : function(){}
    }
  }
