import Theatre from '../easel/Theatre.js';
import Velocity from '../easel/Velocity.js';
import {Circle} from '../easel/Shape.js';

import Ship from '../src/Ship.js';
import RadarScreen from '../src/RadarScreen.js';

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


// Radar Theatre Setup
const canvasElement = document.getElementById("theatre");
const theatre = new Theatre(canvasElement, 854, 480);
// theatre.origin = "CENTER";
theatre.widthConsistent = true;
theatre.canvas.style.backgroundColor = "black"
theatre.redraw = () => {}; // canvas cannot resize, as it is a fixed resolution

// Game State

export const ships = [
    new Ship(0, 0, 5, "rgba(0, 200, 0, 0.8)"),
    new Ship(310, 130, 5,"rgba(200, 0, 0, 0)"), // !!! set to 0.8 to visualize
    new Ship(120, 120, 3, "rgba(0, 0, 200, 0.8)"),
]
for (let ship of ships) {
    ship.randomizeLocation(12, 8); // magic number! set to grid dimensions
}

const mouse = { x: ships[0].x, y: ships[0].y }
let abilityVisual = { text: ""};

export function setAbilityVisual(visual) {
    abilitySound.play();
    abilitySound.currentTime = 0.4;
    Object.assign(abilityVisual, visual);
    
}

// Radar Screen
const radarCanvas = new OffscreenCanvas(436, 373);
const radarScreen = new RadarScreen(radarCanvas, ships, mouse, abilityVisual);

// Interaction
theatre.addEventListener("contextmenu", (e) => e.preventDefault());
theatre.addEventListener("pointermove", mouseMove);
theatre.addEventListener("pointerdown", onClick);


function getWorldCoordinates(event) {
    let {x, y} = theatre.getEventCoordinates(event);

    return {
        x: x + ships[0].x - 228 - radarCanvas.width/2,
        y: y + ships[0].y - 59 - radarCanvas.height / 2
    } // 100 & 100 are the screen offsets
}

function mouseMove(event) {
    let {x, y} = getWorldCoordinates(event);

    // prevent when moving
    if (ships[0].v.getMagnitude() > 0.5) {
        return;
    }

    mouse.x = x;
    mouse.y = y;
}

function onClick(event) {
    let {x, y} = getWorldCoordinates(event);

    // prevent when moving
    if (ships[0].v.getMagnitude() > 0.5) {
        return;
    }

    mouse.x = x;
    mouse.y = y;
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


// Images
const computerScene = new Image(); computerScene.src = "./art/environment/computerscene.png";
const computerOverlay = new Image(); computerOverlay.src = "./art/environment/computerscene_screenoverlay.png";

function render() {
    radarScreen.render();

    let x = 228; // magic numbers!
    let y = 59;

    theatre.ctx.fillRect(x, y, radarScreen.canvas.width, radarScreen.canvas.height);
    
    // potentially unoptomized, use this if needed
    // theatre.ctx.drawImage(radarScreen.canvas, x, y);

    theatre.ctx.save();
    theatre.ctx.globalCompositeOperation = "lighter";
    theatre.ctx.filter = "blur(5px)";
    theatre.ctx.drawImage(radarScreen.canvas, x, y);
    theatre.ctx.filter = "none";
    theatre.ctx.globalCompositeOperation = "source-over";
    theatre.ctx.drawImage(radarScreen.canvas, x, y);
    theatre.ctx.restore();

    theatre.ctx.drawImage(computerScene, 0, 0);
    theatre.ctx.drawImage(computerOverlay, 228, 59);

    requestAnimationFrame(render);
}

function physics() {
    for (let ship of ships) {
        ship.v.moveObject(ship);
        ship.v.applyFriction(0.9);
    }

}


requestAnimationFrame(render);
setInterval(physics, 20);


globalThis.SHIPS = ships; // expose as global variable for console testing
globalThis.ABILITYVISUAL = abilityVisual;
globalThis.THEATRE = theatre;