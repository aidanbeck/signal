import Theatre from '../easel/Theatre.js';

import Ship from '../src/Ship.js';
import renderScreen from '../src/renderScreen.js';

// Theatre Setup
const canvasElement = document.getElementById("theatre");
const theatre = new Theatre(canvasElement, 300, 300);
const ctx = theatre.ctx;
theatre.origin = "CENTER";
// theatre.makeFullScreen();
theatre.shorterDimensionConsistent = true;
theatre.canvas.style.backgroundColor = "black"
theatre.redraw = () => { renderScreen(theatre, ctx, ships, 5, 50) };

// State
const ships = [
    new Ship(0, 0, 3, 3, "rgba(0, 200, 0, 0.8)"),
    new Ship(50, 25, 3, 3, "rgba(200, 0, 0, 0.8)")
]

// Interaction
theatre.addEventListener("contextmenu", (e) => e.preventDefault());

// setInterval(renderShapes, 20);

renderScreen(theatre, ctx, ships, 5, 50);

globalThis.SHIP = ships; // expose as global variable for console testing