import Velocity from '../easel/Velocity.js';

export default class Ship {

    constructor(x = 0, y = 0, dotRadius = 5, color = "green", turns = 3, health = 3, v = new Velocity(0,0), tileSize = 50) {

        this.x = x;
        this.y = y;
        this.dotRadius = dotRadius;
        this.color = color;

        this.turns = turns;
        this.health = health;
        this.v = v;
        this.tileSize = tileSize;
    }

    randomizeLocation(gridWidth, gridHeight) {
        const maxX = gridWidth * this.tileSize;
        const maxY = gridHeight * this.tileSize;
        this.x = Math.floor(Math.random() * maxX);
        this.y = Math.floor(Math.random() * maxY);
    }

    longitude(sub) {

        if (this.x > sub.x) { return -1; } // sub is west
        if (this.x < sub.x) { return 1; } //sub is east
        return 0; // sub is on the same x-level
    }

    latitude(sub) {

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

    hits(gridX, gridY) {

        const myGridX = Math.floor(this.x / this.tileSize);
        const myGridY = Math.floor(this.y / this.tileSize);

        return gridX == myGridX && gridY == myGridY;
        
        
    }
}