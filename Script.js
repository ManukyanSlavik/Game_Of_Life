var socket = io();

var side = 20;


// window.onload = function () {
//   let createGr = document.getElementById("createGr");

//   createGr.onclick = function () {
//     let x = Math.floor(Math.random() * matrix[0].length);
//     let y = Math.floor(Math.random() * matrix.length);

//     matrix[y][x] = 1;
//     let gr = new Grass(x, y);
//     grassArr.push(gr);
//   };

//   let createGrEat = document.getElementById("createGrEat");

//   createGrEat.onclick = function CreateGrassEater() {
//     let x = Math.floor(Math.random() * matrix[0].length);
//     let y = Math.floor(Math.random() * matrix.length);

//     matrix[y][x] = 2;
//     let grEater = new GrassEater(x, y);
//     grassEaterArr.push(grEater);
//   };

//   let createPred = document.getElementById("createPred");

//   createPred.onclick = function CreatePredator() {
//     let x = Math.floor(Math.random() * matrix[0].length);
//     let y = Math.floor(Math.random() * matrix.length);

//     matrix[y][x] = 3;
//     let allEater = new AllEater(x, y);
//     allEaterArr.push(allEater);
//   };

//   let createHum = document.getElementById("createHum");

//   createHum.onclick = function CreateHuman() {
//     let x = Math.floor(Math.random() * matrix[0].length);
//     let y = Math.floor(Math.random() * matrix.length);

//     matrix[y][x] = 4;
//     let human = new Human(x, y);
//     humanArr.push(human);
//   };
// };

function setup() {
  createCanvas((60 * side) + 1, (60 * side) + 1);
  background("#acacac");

  // for (var y = 0; y < matrix.length; y++) {
  //   for (var x = 0; x < matrix[y].length; x++) {
      // if (matrix[y][x] == 1) {
      //   var gr = new Grass(x, y);
      //   grassArr.push(gr);
      // } else if (matrix[y][x] == 2) {
      //   var grEater = new GrassEater(x, y);
      //   grassEaterArr.push(grEater);
      // } else if (matrix[y][x] == 3) {
      //   var allEater = new AllEater(x, y);
      //   allEaterArr.push(allEater);
      // } else if (matrix[y][x] == 4) {
      //   var human = new Human(x, y);
      //   humanArr.push(human);
      // } else if (matrix[y][x] == 5) {
      //   var mushroom = new HermitMushroom(x, y);
      //   mushroomArr.push(mushroom);
      // }
  //   }
  // }
}

function risuy() {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 0) {
        fill("#acacac");
      } else if (matrix[y][x] == 1) {
        fill("green");
      } else if (matrix[y][x] == 2) {
        fill("yellow");
      } else if (matrix[y][x] == 3) {
        fill("red");
      } else if (matrix[y][x] == 4) {
        fill("#c58c85");
      } else if (matrix[y][x] == 5) {
        fill("purple");
      }

      rect(x * side, y * side, side, side);
    }
  }

  // for (var i in grassArr) {
  //   grassArr[i].Multiply();
  // }
  // for (var i in grassEaterArr) {
  //   grassEaterArr[i].Eat();
  // }
  // for (var i in allEaterArr) {
  //   allEaterArr[i].Eat();
  // }
  // for (var i in humanArr) {
  //   humanArr[i].Eat();
  // }
  // for (var i in mushroomArr) {
  //   mushroomArr[i].AnnihilateThreat();
  // }

  // document.getElementById("grCount").innerHTML = "Grass: " + grassArr.length;
  // document.getElementById("grEatCount").innerHTML = "Grass Eater: " + grassEaterArr.length;
  // document.getElementById("allEatCount").innerHTML = "Predator: " + allEaterArr.length;
  // document.getElementById("humCount").innerHTML = "Human: " + humanArr.length;
  // document.getElementById("mushCount").innerHTML = "Mushroom: " + mushroomArr.length;

}

setInterval(function(){
  socket.on("send matrix", risuy);
}, 1000);