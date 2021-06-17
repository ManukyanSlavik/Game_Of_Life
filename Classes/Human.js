let Creature = require("./Creature");

module.exports = class Human extends Creature{
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
        matrix[y][x] = 4;
        let human = new Human(x, y);
  
        humanArr.push(human);
  
        this.energy = 20;
      }
    }
  
    Eat() {
      let found = super.ChooseConcreteCells(1, 2);
      let exact = random(found);
  
      if (exact && matrix[exact[1]][exact[0]] == 1 && this.energy < 30) {
        this.energy += 2;
        let x = exact[0];
        let y = exact[1];
  
        for (let i = 0; i < grassArr.length; i++) {
          if (grassArr[i].x == x && grassArr[i].y == y) {
            grassArr.splice(i, 1);
          }
        }
  
        matrix[y][x] = 4;
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
  
        matrix[y][x] = 4;
        matrix[this.y][this.x] = 0;
  
        this.x = x;
        this.y = y;
  
        if (this.energy > 40) {
          this.Mul();
        }
      } else {
        this.Move();
      }
    }
  
    Move() {
      super.GetNewCoordinates();
      var found = super.FindEmptyCells();
      var exact = random(found);
  
      if (exact) {
        let x = exact[0];
        let y = exact[1];
  
        matrix[y][x] = 4;
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
      for (let i = 0; i < humanArr.length; i++) {
        if (humanArr[i].x == this.x && humanArr[i].y == this.y) {
          humanArr.splice(i, 1);
        }
      }
  
      matrix[this.y][this.x] = 0;
    }
  }
  