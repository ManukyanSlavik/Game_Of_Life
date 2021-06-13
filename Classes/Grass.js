class Grass {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.multiply = 0;
      this.directions = [
        [this.x - 1, this.y - 1],
        [this.x, this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y],
        [this.x + 1, this.y],
        [this.x - 1, this.y + 1],
        [this.x, this.y + 1],
        [this.x + 1, this.y + 1],
      ];
    }
  
    FindEmptyCells(char) {
      var found = [];
      for (var i in this.directions) {
        var x = this.directions[i][0];
        var y = this.directions[i][1];
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
          if (matrix[y][x] == char) {
            found.push(this.directions[i]);
          }
        }
      }
  
      return found;
    }
  
    Multiply() {
      this.multiply++;
      var cells = this.FindEmptyCells(0);
      var exact = random(cells);
      if (exact && this.multiply > 5) {
        let x = exact[0];
        let y = exact[1];
        let newGr = new Grass(x, y);
        matrix[y][x] = 1;
        grassArr.push(newGr);
        this.multiply = 0;
      }
    }
  }