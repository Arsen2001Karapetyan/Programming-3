//------------------------------------------------GISHATICH--------------------------------------------
var LivingCreature = require("./LivingCreature");


module.exports = class Predator extends LivingCreature {
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    };

    move() {
        this.getNewCoordinates();
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell) {

            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 3;
            this.x = newCell[0];
            this.y = newCell[1];
            if (this.energy == 0) {
                for (var i in Pred) {
                    if (Pred[i].x == this.x && Pred[i].y == this.y) {
                        Pred.splice(i, 1);
                        matrix[this.y][this.x] = 0;
                        break;
                    }
                }
            } else {
                this.energy--
            };
        }
    }
    eat() {
        this.getNewCoordinates();
        var emptyCells = this.chooseCell(2);
        var newCell = random(emptyCells);
        if (newCell) {

            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 3;
            this.x = newCell[0];
            this.y = newCell[1];
            if (this.energy < 0) {
                for (var i in GrassEat) {
                    if (GrassEat[i].x == this.x && GrassEat[i].y == this.y) {
                        GrassEat.splice(i, 1);
                        break;
                    }
                }
            }
            if (this.energy == 7) {
                Pred.push(new Predator(this.x, this.y));
            } else {
                this.energy++
            };

        } else {
            this.move();
        }
    }
}