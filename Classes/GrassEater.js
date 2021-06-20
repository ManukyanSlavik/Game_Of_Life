let Creature = require("./Creature");

module.exports = class GrassEater extends Creature{
    constructor(x, y) {
      super(x, y);
      this.energy = 20;
    }
  
    Mul() {
      let emptyCells = super.FindEmptyCells();
      let exact = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  
      if (exact && this.energy > 8) {
        let x = exact[0];
        let y = exact[1];
        matrix[y][x] = 2;
        let eater = new GrassEater(x, y);
  
        grassEaterArr.push(eater);
  
        this.energy = 20;
      }
    }
  
    Eat() {
      let found = super.ChooseCell(1);
      let exact = found[Math.floor(Math.random() * found.length)];
  
      if (exact) {
        this.energy += 3;
        let x = exact[0];
        let y = exact[1];
  
        for (let i = 0; i < grassArr.length; i++) {
          if (grassArr[i].x == x && grassArr[i].y == y) {
            grassArr.splice(i, 1);
          }
        }
  
        matrix[y][x] = 2;
        matrix[this.y][this.x] = 0;
  
        this.x = x;
        this.y = y;
  
        if (this.energy > 30) {
          this.Mul();
        }
      } else {
        this.Move();
      }
    }
  
    Move() {
      let emptyCells = super.FindEmptyCells();
      let exact = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  
      if (exact) {
        let x = exact[0];
        let y = exact[1];
  
        matrix[y][x] = 2;
        matrix[this.y][this.x] = 0;
  
        this.x = x;
        this.y = y;
  
        this.energy--;
  
        if (this.energy < 0) {
          this.Die();
        }
      } else {
        this.energy--;
        if (this.energy < 0) {
          this.Die();
        }
      }
    }
  
    Die() {
      for (let i = 0; i < grassEaterArr.length; i++) {
        if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
          grassEaterArr.splice(i, 1);
        }
      }
      matrix[this.y][this.x] = 0;
    }
  }