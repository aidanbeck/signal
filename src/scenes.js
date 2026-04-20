import Texture from '../easel/Texture.js';
import Velocity from '../easel/Velocity.js';
import { Card, Scene } from './Scene.js';
import RadarScreen from '../src/RadarScreen.js';

import { ships, abilityVisual } from './state.js';
import { moveSound } from './audio.js';


// SCENES
let SCENES = [];
export let currentScene;
export function getCurrentScene() {
    return currentScene;
}

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

    radarScreen.render();
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