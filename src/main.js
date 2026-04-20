import Theatre from '../easel/Theatre.js';
import Texture from '../easel/Texture.js';
import Velocity from '../easel/Velocity.js';
import { Circle, Rectangle } from '../easel/Shape.js';

import { Card, Scene } from '../src/Scene.js';
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

function mouseMove(event) {
    let {x, y} = theatre.getEventCoordinates(event);
    currentScene.hover(x, y);
}

function onClick(event) {
    let {x, y} = theatre.getEventCoordinates(event);
    currentScene.click(x, y);
    startTrack(); // !!! for audio, start on first click
}



// Game State
let SCENES = [];
let currentScene;
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




// SCENES

// Computer Scene
const computerScene = new Scene("./art/environment/computerscene.png");
SCENES.push(computerScene);
currentScene = SCENES[0];

// Radar Card
// Radar Screen
const radarCanvas = new OffscreenCanvas(436, 373);
const radarMouse = { x: 0, y: 0 }
const radarScreen = new RadarScreen(radarCanvas, ships, radarMouse, abilityVisual);
for (let ship of ships) {
    ship.randomizeLocation(radarScreen.gridWidth, radarScreen.gridHeight);
}
const radarImageOffset = { x: 228, y: 59}
let radarCard = new Card(
    radarImageOffset.x, radarImageOffset.y, radarScreen.canvas.width, radarScreen.canvas.height,
    null, // radarCanvas
    radarClick, radarHover, radarRender
);
function radarClick(x, y) {
    let radarX = x + ships[0].x - radarImageOffset.x - radarCanvas.width / 2;
    let radarY = y + ships[0].y - radarImageOffset.y - radarCanvas.height / 2;

    // prevent clicking when moving
    if (ships[0].v.getMagnitude() > 0.5) {
        return;
    }

    radarMouse.x = radarX;
    radarMouse.y = radarY;
    let newMoveSound = moveSound.cloneNode(); // !!! unoptomized
    newMoveSound.volume = 0.05;
    newMoveSound.play();

    //center around player (ship 0)
    radarX -= ships[0].x;
    radarY -= ships[0].y;

    let boost = new Velocity(radarX/10, radarY/10); // divide by 5 for friction 0.8, divide 10 for friction 0.9
    ships[0].v.addVelocity(boost);
}
function radarHover(x, y) {

    let radarX = x + ships[0].x - radarImageOffset.x - radarCanvas.width / 2;
    let radarY = y + ships[0].y - radarImageOffset.y - radarCanvas.height / 2;
    let shipIsStill = ships[0].v.getMagnitude() < 0.5;
    if (shipIsStill) {
        radarMouse.x = radarX;
        radarMouse.y = radarY;
    }
}
function radarRender(ctx) {
    ctx.fillRect(radarImageOffset.x, radarImageOffset.y, radarScreen.canvas.width, radarScreen.canvas.height);

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.filter = "blur(5px)";
    ctx.drawImage(radarScreen.canvas, radarImageOffset.x, radarImageOffset.y);
    ctx.filter = "none";
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(radarScreen.canvas, radarImageOffset.x, radarImageOffset.y);
    ctx.restore();
}
computerScene.cards.push(radarCard);

// Overlay Card
let computerOverlayCard = new Card(
    radarCard.x, radarCard.y, radarCard.w, radarCard.h,
    new Texture("./art/environment/computerscene_screenoverlay.png")
)
computerScene.cards.push(computerOverlayCard);

// Back Cards
function goBack(x, y) {
    console.log("back"); // TODO change current scene
} 
computerScene.cards.push(new Card(0, 0, 180, 480, null, goBack));
computerScene.cards.push(new Card(720, 0, 180, 480, null, goBack));





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

// Main Loops

function render() {

    radarScreen.render();
    let currentScene = SCENES[0]
    currentScene.render(theatre.ctx);
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
globalThis.SCENE = computerScene;