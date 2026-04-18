import Theatre from '../easel/Theatre.js';
import { Point, Circle, Rectangle } from '../easel/Shape.js';

// Theatre Setup
const canvasElement = document.getElementById("theatre");
const theatre = new Theatre(canvasElement, 800, 800);
const ctx = theatre.ctx;
theatre.origin = "CENTER";
theatre.makeFullScreen();
theatre.shorterDimensionConsistent = true;
theatre.canvas.style.backgroundColor = "rgb(255, 255, 255)";
theatre.ctx.imageSmoothingEnabled = false; //prevent image blurring
theatre.redraw = renderShapes;

// Interaction
theatre.addEventListener("pointerdown", mouseDown);
theatre.addEventListener("pointermove", mouseMove);
theatre.addEventListener("pointerup", mouseUp);
theatre.addEventListener("contextmenu", (e) => e.preventDefault());

// State
let selectedShape = null;
let tracedShape = null;
const shapes = [];

function mouseDown(event) {

    let {x, y} = theatre.getEventCoordinates(event);

    // Select Shape
    const mousePoint = new Point(x, y);
    for (let shape of shapes) {
        if (shape.overlaps(mousePoint)) { selectedShape = shape; }
    }

    if (selectedShape) { 
        shapes.push(selectedShape); // move to top
        mouseMove(event); // move shape to mouse
        return;
    }

    // Create New Shape
    if (event.button === 0) { // left click
        tracedShape = new Rectangle(x, y, 0, 0);
    } else { // right click;
        tracedShape = new Circle(x, y, 0);
    }
}

function mouseMove(event) {

    let {x, y} = theatre.getEventCoordinates(event);

    selectedShape && moveSelectedShape(x, y);
    tracedShape && moveTracedShape(x, y);
}

function mouseUp() {

    if (tracedShape instanceof Rectangle) { tracedShape.normalizeDimensions(); }
    tracedShape && shapes.push(tracedShape);

    tracedShape = null;
    selectedShape = null;
}

function moveSelectedShape(x, y) {
    selectedShape.x = x;
    selectedShape.y = y;

    // Center Rectangle Around XY
    if (selectedShape instanceof Rectangle) {
        selectedShape.x -= selectedShape.w / 2;
        selectedShape.y -= selectedShape.h / 2;
    }
}

function moveTracedShape(x, y) {
    
    if (tracedShape instanceof Circle) {
        tracedShape.r = tracedShape.distance(tracedShape, {x: x, y: y});
    }

    if (tracedShape instanceof Rectangle) {
        tracedShape.w = x - tracedShape.x;
        tracedShape.h = y - tracedShape.y;
    }
}

function renderShapes() {
    
    ctx.clearRect(-theatre.canvas.width/2, -theatre.canvas.height/2, theatre.canvas.width, theatre.canvas.height);
        
    for (let shape of shapes) {

        ctx.fillStyle = `darkblue`;
        
        // color if colliding
        for (let otherShape of shapes) {
            if (shape.overlaps(otherShape)) { ctx.fillStyle = `crimson`; }
        }

        drawShape(shape, true);
        drawShape(shape, false);
    }

    tracedShape && drawShape(tracedShape, false);
}

function drawShape(shape, fill = true) {
    ctx.beginPath();
    if (shape instanceof Circle) {
        ctx.arc(shape.x, shape.y, shape.r, 0, Math.PI * 2);
        fill && ctx.fill();
        !fill && ctx.stroke();
    }
    if (shape instanceof Rectangle) {
        fill && ctx.fillRect(shape.x, shape.y, shape.w, shape.h);
        !fill && ctx.strokeRect(shape.x, shape.y, shape.w, shape.h); 
    }
}

setInterval(renderShapes, 20);

globalThis.SHAPES = shapes; // expose as global variable for console testing