/*
/--------------------------------------/
  All vital imports are here
/--------------------------------------/
*/

var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var fs = require("fs");

Weather = "Winter";
Grass = require("./Classes/Grass");
GrassEater = require("./Classes/GrassEater");
AllEater = require("./Classes/AllEater");
Human = require("./Classes/Human");
Mushroom = require("./Classes/HermitMushroom");

/*
/--------------------------------------/
  Localhost and port configuration 
/--------------------------------------/
*/

app.use(express.static("."));

app.get("/", function (req, res) {
  res.redirect("index.html");
});
server.listen(3000);

/*
/--------------------------------------/
  Logic goes here
/--------------------------------------/
*/

grassArr = [];
grassEaterArr = [];
allEaterArr = [];
humanArr = [];
mushroomArr = [];
matrix = [];

function CreateMatrix(m, n) {
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
}

CreateMatrix(60, 60);

io.sockets.emit("send matrix", matrix);

function CreateObject(matrix) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
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

function Play() {
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

setInterval(Play, 100);

io.on("connection", function () {
  CreateObject(matrix);
});

function WeatherChange() {
  if (Weather == "Winter") {
    Weather = "Spring"
  }
  else if (Weather == "Spring") {
    Weather = "Summer"
  }
  else if (Weather == "Summer") {
    Weather = "Autumn"
  }
  else if (Weather == "Autumn") {
    Weather = "Winter"
  }
  io.sockets.emit('Weather change', Weather)
}
setInterval(WeatherChange, 5000);

/*
/--------------------------------------/
  Statistics goes into Statistics.json
/--------------------------------------/
*/

var Statistics = {};

setInterval(function () {
  Statistics.Grass = grassArr.length;
  Statistics.GrassEater = grassEaterArr.length;
  Statistics.AllEater = allEaterArr.length;
  Statistics.Human = humanArr.length;
  Statistics.Mushroom = mushroomArr.length;

  fs.writeFile("Statistics.json", JSON.stringify(Statistics), function () {
    console.log("Statistics logged successfully.");
  });
}, 2000);

/*
/--------------------------------------/
  Creation buttons logic goes here
/--------------------------------------/
*/

io.on("Create grass", function () {
  let x = Math.floor(Math.random() * matrix[0].length);
  let y = Math.floor(Math.random() * matrix.length);

  if (matrix[y][x] == 0) {
    matrix[y][x] = 1;
    grassArr.push(new Grass(x, y));
  }
});
io.on("Create grEater", function () {
  let x = Math.floor(Math.random() * matrix[0].length);
  let y = Math.floor(Math.random() * matrix.length);

  if (matrix[y][x] == 0) {
    matrix[y][x] = 2;
    grassEaterArr.push(new GrassEater(x, y));
  }
});
io.on("Create pred", function () {
  let x = Math.floor(Math.random() * matrix[0].length);
  let y = Math.floor(Math.random() * matrix.length);

  if (matrix[y][x] == 0) {
    matrix[y][x] = 3;
    allEaterArr.push(new AllEater(x, y));
  }
});
io.on("Create human", function () {
  let x = Math.floor(Math.random() * matrix[0].length);
  let y = Math.floor(Math.random() * matrix.length);

  if (matrix[y][x] == 0) {
    matrix[y][x] = 4;
    mushroomArr.push(new Mushroom(x, y));
  }
});
