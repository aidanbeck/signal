import Velocity from '../easel/Velocity.js';

export default class Ship {

    constructor(x = 0, y = 0, turns = 3, health = 3, color = "green", v = new Velocity(0,0)) {

        this.x = x;
        this.y = y;
        this.turns = turns;
        this.health = health;
        this.v = v;
        this.color = color;
    }

    longitude(sub) {

        if (this.x > sub.x) { return -1; } // sub is east
        if (this.x < sub.x) { return 1; } //sub is west
        return 0; // sub is on the same x-level
    }

    latitiude(sub) {

        if (this.y > sub.y) { return -1; } // sub is north
        if (this.y < sub.y) { return 1; } //sub is south
        return 0; // sub is on the same y-level
    }

    distance(sub) {

        const xDistance = Math.abs(this.x - sub.x);
        const yDistance = Math.abs(this.y - sub.y);

        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    }

    radius(sub, radius) {
        const distance = this.distance(sub);
        if (distance <= radius) {
            return true;
        }
        return false;
    }

    isCloserToBouey(sub, bouey) {
        const boueyShipDistance = bouey.distance(this);
        const boueySubDistance = bouey.distance(sub);

        if (boueySubDistance > boueyShipDistance) {
            return true;
        }

        return false;
    }

    moveIsHot(sub) {
        // todo
    }

    hit(gridX, gridY, lineSpacePixels) {

        const myGridX = Math.floor(this.x / lineSpacePixels);
        const myGridY = Math.floor(this.y / lineSpacePixels);

        return gridX == myGridX && gridY == myGridY;
        
        
    }
}