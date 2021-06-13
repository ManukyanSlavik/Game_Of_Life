class HermitMushroom {
    constructor(x, y) {
      this.x = x;
      this.y = y;
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
  
    GetNewCoordinates() {
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
  
    SearchForLifeforms() {
      this.GetNewCoordinates();
      var result = [];
  
      for (let i = 0; i < this.directions.length; i++) {
        let x = this.directions[i][0];
        let y = this.directions[i][1];
  
        if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
          if (matrix[y][x] == 2 || matrix[y][x] == 3) {
            result.push(this.directions[i]);
          }
        }
      }
  
      return result;
    }
  
    AnnihilateThreat() {
      var lifeforms = this.SearchForLifeforms();
  
      if (lifeforms.length != 0) {
        for (let i = 0; i < lifeforms.length; i++) {
          let x = lifeforms[i][0];
          let y = lifeforms[i][1];
  
          if (matrix[y][x] == 2) {
            for (let j = 0; j < grassEaterArr.length; j++) {
              if (grassEaterArr[j].x == x && grassEaterArr[j].y == y) {
                console.log("Destroying grass eater.");
                grassEaterArr.splice(j, 1);
                break;
              }
            }
          } else if (matrix[y][x] == 3) {
            for (let j = 0; j < allEaterArr.length; j++) {
              if (allEaterArr[j].x == x && allEaterArr[j].y == y) {
                console.log("Destroying all eater.");
                allEaterArr.splice(j, 1);
                break;
              }
            }
          }
  
          matrix[y][x] = 0;
        }
      } else {
        this.SearchForLifeforms();
      }
    }
  }
  