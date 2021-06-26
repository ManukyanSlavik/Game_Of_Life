let Creature = require("./Creature");

module.exports = class HermitMushroom extends Creature{
    constructor(x, y) {
      super(x, y);
    }

  
    AnnihilateThreat() {
      var lifeforms = super.ChooseConcreteCells(2, 3);
  
      if (lifeforms.length != 0) {
        for (let i = 0; i < lifeforms.length; i++) {
          let x = lifeforms[i][0];
          let y = lifeforms[i][1];
  
          if (matrix[y][x] == 2) {
            for (let j = 0; j < grassEaterArr.length; j++) {
              if (grassEaterArr[j].x == x && grassEaterArr[j].y == y) {
                grassEaterArr.splice(j, 1);
                break;
              }
            }
          } else if (matrix[y][x] == 3) {
            for (let j = 0; j < allEaterArr.length; j++) {
              if (allEaterArr[j].x == x && allEaterArr[j].y == y) {
                allEaterArr.splice(j, 1);
                break;
              }
            }
          }
  
          matrix[y][x] = 0;
        }
      } else {
        super.ChooseConcreteCells(2, 3);
      }
    }
  }
  