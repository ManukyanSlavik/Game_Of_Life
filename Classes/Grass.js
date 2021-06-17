let Creature = require("./Creature");

module.exports = class Grass extends Creature{
    constructor(x, y) {
      super(x, y);
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
  
    Multiply() {
      this.multiply++;
      var cells = super.FindEmptyCells();
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