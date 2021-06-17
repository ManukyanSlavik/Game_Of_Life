let Creature = require("./Creature");

module.exports = class AllEater extends Creature{
    constructor(x, y) {
      super(x, y);
      this.energy = 20;
    }
  
    Mul() {
      let found = super.FindEmptyCells();
      let exact = random(found);
  
      if (exact && this.energy > 8) {
        let x = exact[0];
        let y = exact[1];
        matrix[y][x] = 3;
        let allEater = new AllEater(x, y);
  
        allEaterArr.push(allEater);
  
        this.energy = 20;
      }
    }
  
    Eat() {
      let found = super.ChooseConcreteCells(1, 2);
      let exact = random(found);
  
      if (exact && matrix[exact[1]][exact[0]] == 1) {
        this.energy += 2;
        let x = exact[0];
        let y = exact[1];
  
        for (let i = 0; i < grassArr.length; i++) {
          if (grassArr[i].x == x && grassArr[i].y == y) {
            grassArr.splice(i, 1);
          }
        }
  
        matrix[y][x] = 3;
        matrix[this.y][this.x] = 0;
  
        this.x = x;
        this.y = y;
  
        if (this.energy > 30) {
          this.Mul();
        }
      } else if (exact && matrix[exact[1]][exact[0]] == 2) {
        this.energy += 3;
        let x = exact[0];
        let y = exact[1];
  
        for (let i = 0; i < grassEaterArr.length; i++) {
          if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
            grassEaterArr.splice(i, 1);
          }
        }
  
        matrix[y][x] = 3;
        matrix[this.y][this.x] = 0;
  
        this.x = x;
        this.y = y;
  
        if (this.energy > 30) {
          this.Mul();
        }
      } else if (exact && matrix[exact[1]][exact[0]] == 4) {
        this.energy += 4;
        let x = exact[0];
        let y = exact[1];
  
        for (let i = 0; i < humanArr.length; i++) {
          if (
            humanArr[i].x == x &&
            humanArr[i].y == y &&
            humanArr[i].energy < 30
          ) {
            humanArr.splice(i, 1);
          }
        }
  
        matrix[y][x] = 3;
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
      let foundEmpty = super.FindEmptyCells();
      let exact = random(foundEmpty);
  
      if (exact) {
        let x = exact[0];
        let y = exact[1];
  
        matrix[y][x] = 3;
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
      for (let i = 0; i < allEaterArr.length; i++) {
        if (allEaterArr[i].x == this.x && allEaterArr[i].y == this.y) {
          allEaterArr.splice(i, 1);
        }
      }
  
      matrix[this.y][this.x] = 0;
    }
  }
  