var express= require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var fs = require("fs");

var Grass = require("./Classes/Grass");
var GrassEater = require("./Classes/GrassEater");
var AllEater = require("./Classes/AllEater");
var Human = require("./Classes/Human");
var Mushroom = require("./Classes/HermitMushroom");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

/*-----------------------------------------------------------------*/

var grassArr = [];
var grassEaterArr = [];
var allEaterArr = [];
var humanArr = [];
var mushroomArr = [];

function CreateMatrix(m, n) {
  let matrix = [];
  for (let i = 0; i < m; i++) {
    matrix.push([]);
    for (let j = 0; j < n; j++) {
      matrix[i].push(0);
    }
  }

  function AddCharacter(char, count) {
    for (let i = 0; i < count; i++) {
      let x = Math.floor(Math.random() * matrix[0].length);
      let y = Math.floor(Math.random() * matrix.length);
      matrix[y][x] = char;
    }
  }

  AddCharacter(1, 40);
  AddCharacter(2, 10);
  AddCharacter(3, 10);
  AddCharacter(4, 10);
  AddCharacter(5, 10);

  return matrix;
}

let matrix = CreateMatrix(60, 60);

io.sockets.emit("send matrix", matrix);

function CreateObject(matrix){
  for(let y = 0; y < matrix.length; y++){
    for(let x = 0; x < matrix[y].length; x++){
      if (matrix[y][x] == 1) {
        var gr = new Grass(x, y);
        grassArr.push(gr);
      } else if (matrix[y][x] == 2) {
        var grEater = new GrassEater(x, y);
        grassEaterArr.push(grEater);
      } else if (matrix[y][x] == 3) {
        var allEater = new AllEater(x, y);
        allEaterArr.push(allEater);
      } else if (matrix[y][x] == 4) {
        var human = new Human(x, y);
        humanArr.push(human);
      } else if (matrix[y][x] == 5) {
        var mushroom = new Mushroom(x, y);
        mushroomArr.push(mushroom);
      }
    }
  }

  io.sockets.emit("send matrix", matrix);
}

function Play(){
  for (var i in grassArr) {
    grassArr[i].Multiply();
  }
  for (var i in grassEaterArr) {
    grassEaterArr[i].Eat();
  }
  for (var i in allEaterArr) {
    allEaterArr[i].Eat();
  }
  for (var i in humanArr) {
    humanArr[i].Eat();
  }
  for (var i in mushroomArr) {
    mushroomArr[i].AnnihilateThreat();
  }

  io.sockets.emit("send matrix", matrix);
}

setInterval(Play, 1000);

io.on("connection", function(){
  CreateObject(matrix);
});