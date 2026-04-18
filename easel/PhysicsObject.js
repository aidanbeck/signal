export default class PhysicsObject {
    constructor(shape, velocity) {
        this.shape = shape;
        this.v = velocity;
    }

    move(sceneObjects) {

        if (this.v.x == 0 && this.v.y == 0) { return []; }

        const startX = this.shape.x;
        const startY = this.shape.y;

        this.shape.x += this.v.x;
        this.shape.y += this.v.y;

        let overlappingObjects = this.getOverlappingObjects(sceneObjects);
        let lastOverlappingObjects = [...overlappingObjects];

        if (overlappingObjects.length == 0) { return []; }

        const backStepX = this.v.x / Math.abs(this.v.x) * -1;
        const backStepY = this.v.y / Math.abs(this.v.y) * -1;

        // resolve collision on x axis
        while (overlappingObjects.length > 0 && Math.floor(this.shape.x) != Math.floor(startX) ) {

            lastOverlappingObjects = [...overlappingObjects];
            this.shape.x += backStepX;
            overlappingObjects = this.getOverlappingObjects(overlappingObjects);
        }

        while (overlappingObjects.length > 0 && Math.floor(this.shape.y) != Math.floor(startY) ) {

            lastOverlappingObjects = [...overlappingObjects];
            this.shape.y += backStepY;
            overlappingObjects = this.getOverlappingObjects(overlappingObjects);
            
        }

        return lastOverlappingObjects;

    }

    getOverlappingObjects(objects) {

        let overlappingObjects = [];

        for (let object of objects) {
            if (this == object) { continue; }

            this.shape.overlaps(object.shape) && overlappingObjects.push(object);
        }

        return overlappingObjects;
    }
}