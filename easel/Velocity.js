export default class Velocity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    moveObject(object) {
        object.x += this.x;
        object.y += this.y;
    }

    addVelocity(velocity) {
        this.x += velocity.x;
        this.y += velocity.y;
    }

    getMagnitude() {
        // a² + b² = c²
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    setMagnitude(magnitude) {
        this.x *= magnitude;
        this.y *= magnitude;
    }

    normalize() {
        const magnitude = this.getMagnitude();
        this.x /= magnitude;
        this.y /= magnitude;
    }

    clamp(minimum = 0.01) {
        if (Math.abs(this.x) < minimum) { this.x = 0; }
        if (Math.abs(Math.abs(this.y)) < minimum) { this.y = 0; }
    }

    invert() {
        this.x = -this.x;
        this.y = -this.y;
    }

    rotate(degrees) {
        // TODO
    }

    pointTowards(object, point) {
        
        const magnitude = this.getMagnitude();
        const width = object.x - point.x;
        const height = object.y - point.y;

        this.x = width;
        this.y = height;

        this.normalize();
        this.setMagnitude(magnitude);
        this.invert();
    }

    applyFriction(friction) {
        this.x *= friction;
        this.y *= friction;
    }

    applyGravity(gravity) {
        this.y += gravity; // +y is down
    }
}