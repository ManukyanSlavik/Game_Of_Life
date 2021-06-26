/*
/--------------------------------------/
  No any logic here, only drawing
/--------------------------------------/
*/

var socket = io();
var side = 20;
//var Weather;

function setup() {
  createCanvas(60 * side + 1, 60 * side + 1);
  background("#acacac");
}

// socket.on("Weather change", function (data) {
//   Weather = data;
// });

function risuy(matrix) {
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
}

setInterval(function () {
  socket.on("send matrix", risuy);
}, 100);

/*
/--------------------------------------/
  Creation buttons triggering this functions
/--------------------------------------/
*/

function CreateGrass() {
  socket.emit("Create grass");
}
function CreateGrEater() {
  socket.emit("Create grEater");
}
function CreatePred() {
  socket.emit("Create pred");
}
function CreateHuman() {
  socket.emit("Create human");
}
