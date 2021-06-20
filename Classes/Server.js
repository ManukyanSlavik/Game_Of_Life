var express= require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var fs = require("fs");

var Grass = require("./Grass");
var GrassEater = require("./GrassEater");
var AllEater = require("./AllEater");
var Human = require("./Human");
var Mushroom = require("./HermitMushroom");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

//

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
        let x = Math.floor(random(matrix[0].length));
        let y = Math.floor(random(matrix.length));

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