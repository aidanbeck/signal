import Velocity from '../easel/Velocity.js';

export default class Ship {

    constructor(x = 0, y = 0, turns = 3, health = 3, velocity = new Velocity(0,0)) {

        this.x = x;
        this.y = y;
        this.turns = turns;
        this.health = health;
        this.velocity = velocity;

    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }
}