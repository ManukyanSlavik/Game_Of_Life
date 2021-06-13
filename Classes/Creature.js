class Creature{
    constructor(x, y){
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

    GetNewCoordinates(){
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

    FindEmptyCells() {
        var found = [];
        for (var i in this.directions) {
          var x = this.directions[i][0];
          var y = this.directions[i][1];
          if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
            if (matrix[y][x] == 0) {
              found.push(this.directions[i]);
            }
          }
        }
    
        return found;
      }

    ChooseCell(char){
        this.GetNewCoordinates();
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

    ChooseConcreteCells(char1, char2) {
        this.GetNewCoordinates();
        let result = [];
    
        for (let i = 0; i < this.directions.length; i++) {
          let x = this.directions[i][0];
          let y = this.directions[i][1];
    
          if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
            if (matrix[y][x] == char1 || matrix[y][x] == char2) {
              result.push(this.directions[i]);
            }
          }
        }
    
        return result;
      }
}