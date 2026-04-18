// this handles overlaps specifically

class Shape {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    overlaps(otherShape) {}

    pointsOverlap(pointA, pointB) {
        return pointA.x == pointB.x && pointA.y == pointB.y;
    }

    circlesOverlap(circleA, circleB) {
        const distance = this.distance(circleA, circleB);
        return distance <= circleA.r + circleB.r;
    }

    pointCircleOverlap(point, circle) {
        const distance = this.distance(point, circle);
        return distance <= circle.r;
    }

    rectanglesOverlap(rectangleA, rectangleB) {
        
        // this could be done beforehand? could it be unneeded>?
        let leftRectangle = rectangleA;
        let rightRectangle = rectangleB;
        let topRectangle = rectangleA;
        let bottomRectangle = rectangleB;

        if (rectangleA.x > rectangleB.x) {
            leftRectangle = rectangleB;
            rightRectangle = rectangleA;
        }

        if (rectangleA.y > rectangleB.y) {
            topRectangle = rectangleB;
            bottomRectangle = rectangleA;
        }

        const horizontalOverlap = leftRectangle.x + leftRectangle.w >= rightRectangle.x;
        const verticalOverlap = topRectangle.y + topRectangle.h >= bottomRectangle.y;

        return horizontalOverlap && verticalOverlap;
    }

    pointRectangleOverlap(point, rectangle) {

        const horizontalOverlap = point.x >= rectangle.x && point.x <= rectangle.x + rectangle.w;
        const verticalOverlap = point.y >= rectangle.y && point.y <= rectangle.y + rectangle.h;

        return horizontalOverlap && verticalOverlap;
    }

    circleRectangleOverlap(circle, rectangle) {
        
        const pointHorizontalOverlap = circle.x >= rectangle.x && circle.x <= rectangle.x + rectangle.w;
        const pointVerticalOverlap = circle.y >= rectangle.y && circle.y <= rectangle.y + rectangle.h;

        // circle center inside rectangle
        if (pointHorizontalOverlap && pointVerticalOverlap) { return true; }

        // circle above/below
        if (pointHorizontalOverlap) {
            if (circle.y < rectangle.y) {
                if (circle.y + circle.r > rectangle.y) {
                    return true;
                }
            }
            if (circle.y > rectangle.y) {
                if (circle.y - circle.r < rectangle.y + rectangle.h) {
                    return true;
                }
            }
        }

        // circle left/right
        if (pointVerticalOverlap) {
            if (circle.x < rectangle.x) {
                if (circle.x + circle.r > rectangle.x) {
                    return true;
                }
            }
            if (circle.x > rectangle.x) {
                if (circle.x - circle.r < rectangle.x + rectangle.w) {
                    return true;
                }
            }
        }

        // corner testing
        if (this.pointCircleOverlap(rectangle, circle)) { return true; } // top left corner
        if (this.pointCircleOverlap({x: rectangle.x + rectangle.w, y: rectangle.y}, circle)) { return true; } // top right corner
        if (this.pointCircleOverlap({x: rectangle.x, y: rectangle.y + rectangle.h}, circle)) { return true; } // bottom left corner
        if (this.pointCircleOverlap({x: rectangle.x + rectangle.w, y: rectangle.y + rectangle.h}, circle)) { return true; } // bottom left corner

        return false;
    }

    distance(pointA, pointB) {
        const distanceX = pointA.x - pointB.x;
        const distanceY = pointA.y - pointB.y;
        return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    }
}

class Point extends Shape {
    constructor(x, y) {
        super(x, y);
    }
    overlaps(otherShape) {
        if (this == otherShape) { return; }
        if (otherShape instanceof Point) { return this.pointCircleOverlap(this, otherShape); }
        if (otherShape instanceof Circle) { return this.pointCircleOverlap(this, otherShape); }
        if (otherShape instanceof Rectangle) { return this.pointRectangleOverlap(this, otherShape); }
    }
}

class Circle extends Shape {
    constructor(x, y, r) {
        super(x, y);
        this.r = r;
    }
    overlaps(otherShape) {
        if (this == otherShape) { return; }
        if (otherShape instanceof Point) { return this.pointCircleOverlap(otherShape, this); }
        if (otherShape instanceof Circle) { return this.circlesOverlap(this, otherShape); }
        if (otherShape instanceof Rectangle) { return this.circleRectangleOverlap(this, otherShape); }
    }
}

class Rectangle extends Shape {
    constructor(x, y, w, h) {
        super(x, y);
        this.w = w;
        this.h = h;
    }

    // prevent dimensions from being negative by moving x,y to the top left corner.
    normalizeDimensions() {
        if (this.w < 0) {
            this.x += this.w;
            this.w = -this.w;
        }
        if (this.h < 0) {
            this.y += this.h;
            this.h = -this.h;
        }
    }

    overlaps(otherShape) {
        if (this == otherShape) { return; }
        if (otherShape instanceof Point) { return this.pointRectangleOverlap(otherShape, this); }
        if (otherShape instanceof Circle) { return this.circleRectangleOverlap(otherShape, this); }
        if (otherShape instanceof Rectangle) { return this.rectanglesOverlap(this, otherShape); }
    }
}

export { Point, Circle, Rectangle };