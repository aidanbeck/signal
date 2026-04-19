import Theatre from '../easel/Theatre.js';
import Velocity from '../easel/Velocity.js';
import {Circle} from '../easel/Shape.js';

import Ship from '../src/Ship.js';
import RadarScreen from '../src/RadarScreen.js';


// Theatre Setup
const canvasElement = document.getElementById("theatre");
const theatre = new Theatre(canvasElement, 854, 480);
theatre.heightConsistent = true;
theatre.makeFullScreen();

// Interaction
theatre.addEventListener("contextmenu", (e) => e.preventDefault());
theatre.addEventListener("pointermove", mouseMove);
theatre.addEventListener("pointerdown", onClick);


// Game State
export const ships = [
    new Ship(0, 0, 5, "rgba(0, 200, 0, 0.8)"),
    new Ship(0, 0, 5,"rgba(200, 0, 0, 0)"), // !!! set to 0.8 to visualize
    new Ship(0, 0, 5, "rgba(0, 0, 200, 0.8)"),
]

let abilityVisual = { text: ""};
export function setAbilityVisual(visual) {
    abilitySound.play();
    abilitySound.currentTime = 0.4;
    Object.assign(abilityVisual, visual);
    
}

const mouse = { x: 0, y: 0 }


// Radar Screen
const radarCanvas = new OffscreenCanvas(436, 373);
const radarMouse = { x: 0, y: 0 }
const radarScreen = new RadarScreen(radarCanvas, ships, radarMouse, abilityVisual);
const radarImageOffset = { x: 228, y: 59}
for (let ship of ships) {
    ship.randomizeLocation(radarScreen.gridWidth, radarScreen.gridHeight);
}


function getRadarCoordinates(event) {
    let {x, y} = theatre.getEventCoordinates(event);

    return {
        x: x + ships[0].x - radarImageOffset.x - radarCanvas.width / 2,
        y: y + ships[0].y - radarImageOffset.y - radarCanvas.height / 2
    }
}


// Images
const computerScene = new Image(); computerScene.src = "./art/environment/computerscene.png";
const computerOverlay = new Image(); computerOverlay.src = "./art/environment/computerscene_screenoverlay.png";


// Audio
let trackStarted = false;
const backgroundMusic = new Audio("./sound/background.m4a");
const moveSound = new Audio("./sound/move.mp3");
moveSound.volume = 0.05;
const abilitySound = new Audio("./sound/notif.mp3");
abilitySound.volume = 0.6;
function startTrack() {
    if (trackStarted) { return; }
    
    backgroundMusic.volume = 0.6;
    backgroundMusic.loop = true;
    backgroundMusic.play();
    trackStarted = true;
}


// Interaction Handling

function mouseMove(event) {

    let {x, y} = theatre.getEventCoordinates(event);
    let withinRadarScreen = true; // for now

    if (withinRadarScreen) {
        let {x, y} = getRadarCoordinates(event);
        let shipIsStill = ships[0].v.getMagnitude() < 0.5;
        if (shipIsStill) {
            radarMouse.x = x;
            radarMouse.y = y;
        }

        
    }

    
}

function onClick(event) {
    let {x, y} = getRadarCoordinates(event);

    // prevent when moving
    if (ships[0].v.getMagnitude() > 0.5) {
        return;
    }

    radarMouse.x = x;
    radarMouse.y = y;
    let newMoveSound = moveSound.cloneNode(); // !!! unoptomized
    newMoveSound.volume = 0.05;
    newMoveSound.play();

    //center around player (ship 0)
    x -= ships[0].x;
    y -= ships[0].y;

    let boost = new Velocity(x/10, y/10); // divide by 5 for friction 0.8, divide 10 for friction 0.9
    ships[0].v.addVelocity(boost);

    startTrack(); // !!! for audio
}


// Main Loops

function render() {
    radarScreen.render();

    theatre.ctx.fillRect(radarImageOffset.x, radarImageOffset.y, radarScreen.canvas.width, radarScreen.canvas.height);

    theatre.ctx.save();
    theatre.ctx.globalCompositeOperation = "lighter";
    theatre.ctx.filter = "blur(5px)";
    theatre.ctx.drawImage(radarScreen.canvas, radarImageOffset.x, radarImageOffset.y);
    theatre.ctx.filter = "none";
    theatre.ctx.globalCompositeOperation = "source-over";
    theatre.ctx.drawImage(radarScreen.canvas, radarImageOffset.x, radarImageOffset.y);
    theatre.ctx.restore();

    theatre.ctx.drawImage(computerScene, 0, 0);
    theatre.ctx.drawImage(computerOverlay, radarImageOffset.x, radarImageOffset.y);

    requestAnimationFrame(render);
}

let bouyTimer = 0;
function physics() {
    for (let ship of ships) {
        ship.v.moveObject(ship);
        
    }
    ships[0].v.applyFriction(0.9);
    ships[2].v.applyFriction(0.99);

    bouyTimer++
    if (bouyTimer > 100) {
        ships[2].v.x += (Math.random() - 0.5) / 3;
        ships[2].v.y += (Math.random() - 0.5) /3;
        bouyTimer = 0;
    }
    

}

requestAnimationFrame(render);
setInterval(physics, 20);


// expose as global variable for console testing
globalThis.SHIPS = ships;
globalThis.ABILITYVISUAL = abilityVisual;
globalThis.THEATRE = theatre;