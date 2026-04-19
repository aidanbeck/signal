import Theatre from '../easel/Theatre.js';
import Velocity from '../easel/Velocity.js';

import Ship from '../src/Ship.js';
import RadarScreen from '../src/RadarScreen.js';


// Theatre Setup
const canvasElement = document.getElementById("theatre");
const theatre = new Theatre(canvasElement, 400, 400);
theatre.origin = "CENTER";
theatre.shorterDimensionConsistent = true;
theatre.canvas.style.backgroundColor = "black"
theatre.redraw = () => {}; // canvas cannot resize, as it is a fixed resolution

// Game State
const mouse = { x: 0, y: 0 }

const ships = [
    new Ship(0, 0, 5, "rgba(0, 200, 0, 0.8)"),
    new Ship(310, 130, 5,"rgba(200, 0, 0, 0.8)"),
    new Ship(120, 120, 3, "rgba(0, 0, 200, 0.8)"),
]

// Radar Screen
const radarScreen = new RadarScreen(theatre, ships, mouse);

// Interaction
theatre.addEventListener("contextmenu", (e) => e.preventDefault());
theatre.addEventListener("pointermove", mouseMove);
theatre.addEventListener("pointerdown", onClick);


function getWorldCoordinates(event) {
    let {x, y} = theatre.getEventCoordinates(event);

    return {
        x: x + ships[0].x,
        y: y + ships[0].y
    }
}

function mouseMove(event) {
    let {x, y} = getWorldCoordinates(event);

    mouse.x = x;
    mouse.y = y;
}

function onClick(event) {
    let {x, y} = getWorldCoordinates(event);

    //center around player (ship 0)
    x -= ships[0].x;
    y -= ships[0].y;

    let boost = new Velocity(x/10, y/10); // divide by 5 for friction 0.8, divide 10 for friction 0.9
    ships[0].v.addVelocity(boost);
}


function render() {
    radarScreen.render();
    requestAnimationFrame(render);
}

function physics() {
    start();
    for (let ship of ships) {
        ship.v.moveObject(ship);
        ship.v.applyFriction(0.9);
    }

}

requestAnimationFrame(render);
setInterval(physics, 20);


globalThis.SHIPS = ships; // expose as global variable for console testing