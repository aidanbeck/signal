import Theatre from '../easel/Theatre.js';
import Ship from '../src/Ship.js';

// Theatre Setup
const canvasElement = document.getElementById("theatre");
const theatre = new Theatre(canvasElement, 300, 300);
const ctx = theatre.ctx;
theatre.origin = "CENTER";
theatre.makeFullScreen();  
theatre.shorterDimensionConsistent = true;
theatre.canvas.style.backgroundColor = "black"
theatre.redraw = render;

// State
const playerShip = new Ship();
const enemyShip = new Ship(100, 50);

// Interaction
theatre.addEventListener("contextmenu", (e) => e.preventDefault());


function clearCanvas() {
    ctx.clearRect(-theatre.canvas.width/2, -theatre.canvas.height/2, theatre.canvas.width, theatre.canvas.height);
}

function renderShips(radius) {
    
    ctx.fillStyle = `darkgreen`;
    ctx.beginPath();
    ctx.arc(playerShip.x, playerShip.y, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = `crimson`;
    ctx.beginPath();
    ctx.arc(enemyShip.x, enemyShip.y, radius, 0, Math.PI * 2);
    ctx.fill();
}

function renderGrid(lineSpacePixels) {

    // horizontal lines
    ctx.strokeStyle = "rgb(40,70,70)";
    ctx.beginPath();

    for (let i = -theatre.canvas.height / 2; i < theatre.canvas.height / 2; i += lineSpacePixels) {
        ctx.moveTo(-theatre.canvas.width / 2, i);
        ctx.lineTo(theatre.canvas.width / 2, i);
        ctx.stroke();
    }

    ctx.strokeStyle = "rgb(0,70,70)";
    ctx.beginPath();
    for (let i = -theatre.canvas.width / 2; i < theatre.canvas.width / 2; i += lineSpacePixels) {
        ctx.moveTo(i, -theatre.canvas.height / 2);
        ctx.lineTo(i, theatre.canvas.height / 2);
        ctx.stroke();
    }
}

function render() {

    renderGrid(40);
    renderShips(5);

}

// setInterval(renderShapes, 20);
render();

globalThis.SHIP = playerShip; // expose as global variable for console testing