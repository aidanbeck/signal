import Texture from '../easel/Texture.js';
import Velocity from '../easel/Velocity.js';
import { Circle, Point } from '../easel/Shape.js';
import { Card, Scene } from './Scene.js';
import RadarScreen from '../src/RadarScreen.js';

import { ships, abilityVisual } from './state.js';
import {
    move,
    notif,
    abilityConsoleClick,
    acceptStatus,
    drawing,
    launchbutton,
    miss,
    missilelaunch,
    radarscreenclicking,
    successhit,

    numpads
} from './audio.js';

import {
    distanceAbility,
    bouyAbility,
    longitudeAbility,
    latitudeAbility,
    radius2kAbility,
    radius4kAbility,
    radius8kAbility,
    launchMissile
} from './abilities.js';

import { mouseDown, leftClick } from './main.js';


// SCENES
let SCENES = [];
export let currentScene;


// Cursor
function setCursor(cursorName, offsetX = 0, offsetY = 0) {
    document.body.style.cursor = `url('./art/ui/${cursorName}'), auto`;
}


// COMPUTER SCENE
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
    let newMoveSound = radarscreenclicking.cloneNode(); // !!! unoptomized
    newMoveSound.currentTime = 0.3;
    newMoveSound.volume = 0.05;
    newMoveSound.play();

    //center around player (ship 0)
    radarX -= ships[0].x;
    radarY -= ships[0].y;

    let boost = new Velocity(radarX/10, radarY/10); // divide by 5 for friction 0.8, divide 10 for friction 0.9
    ships[0].v.addVelocity(boost);
}
function radarHover(x, y) {
    //  setCursor("cursor.png");
    document.body.style.cursor = "crosshair";

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

// Navigation Cards
computerScene.cards.push(new Card(0, 0, 180, 480, null, () => { currentScene = mainScene }, () => {setCursor("down.png", -16, -64)} ));
computerScene.cards.push(new Card(720, 0, 180, 480, null, () => { currentScene = mainScene }, () => {setCursor("down.png", -16, -64)} ));
computerScene.cards.push(new Card(180, 433, 540, 47, null, () => { currentScene = mainScene }, () => {setCursor("down.png", -16, -64)} ));




// MAIN SCENE
const mainScene = new Scene("./art/environment/mainscene.png", 854);
SCENES.push(mainScene);
currentScene = mainScene;

// Radar Card
let smallRadarCard = new Card(
    379, 188, 147, 124);
    smallRadarCard.customRender = radarSmallRender;
function radarSmallRender(ctx) {

    radarScreen.render();
    ctx.fillRect(379, 188, 147, 124);

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.filter = "blur(5px)";
    ctx.drawImage(radarScreen.canvas, 379, 188, 147, 124);
    ctx.filter = "none";
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(radarScreen.canvas, 379, 188, 147, 124);
    ctx.restore();
}
mainScene.cards.push(smallRadarCard);

// Overlay Card
let mainOverlayCard = new Card(
    379, 188, 147, 124,
    new Texture("./art/environment/mainscene_frame0_screenoverlay.png")
)
mainScene.cards.push(mainOverlayCard);

//Navigation Cards
mainScene.cards.push(new Card(330, 170, 222, 256, null, () => { currentScene = computerScene }, () => {setCursor("hand_hover.png", -16, -64)} ));
mainScene.cards.push(new Card(575, 240, 280, 220, null, () => { currentScene = abilityConsoleScene }, () => {setCursor("hand_hover.png", -16, -64)} ));
mainScene.cards.push(new Card(140, 291, 170, 100, null, () => {
    launchPreviousScene = currentScene;
    currentScene = launchScene;
}, () => {setCursor("hand_hover.png", -16, -64)} ));
mainScene.cards.push(new Card(0, 0, 265, 290, null, () => { currentScene = mapScene }, () => {setCursor("left.png", -16, -64)} ));
mainScene.cards.push(new Card(0, 290, 140, 70, null, () => { currentScene = mapScene }, () => {setCursor("left.png", -16, -64)} ));
mainScene.cards.push(new Card(68, 360, 72, 200, null, () => { currentScene = mapScene }, () => {setCursor("left.png", -16, -64)} ));
mainScene.cards.push(new Card(0, 414, 72, 200, null, () => { currentScene = mapScene }, () => {setCursor("left.png", -16, -64)} ));
mainScene.cards.push(new Card(0, 360, 68, 54, null, () => {
    tutorialPreviousScene = currentScene;
    currentScene = tutorialScene;
}, () => {setCursor("hand_hover_click.png", -16, -64)} ));



// ABILITY CONSOLE SCENE
const abilityConsoleScene = new Scene("./art/environment/abilityconsolescene.png", 854);
SCENES.push(abilityConsoleScene);

// Overlay Card
let abilityOverlayCard = new Card(
    534, 245, 200, 154,
    new Texture("./art/environment/abilityconsolescene_screenoverlay.png", 200) // could add custom onclick stuff
)
abilityConsoleScene.cards.push(abilityOverlayCard);

// Buttons

abilityConsoleScene.cards.push(new Card(240, 270, 75, 75, null, () => { // left button
    
    abilityConsoleScene.frame = 1;
    abilityOverlayCard.frame > 0 && abilityOverlayCard.frame--;

    let newSound = abilityConsoleClick.cloneNode(); // !!! unoptomized
    newSound.volume = 0.05;
    newSound.play();

}, () => {setCursor("hand_hover.png", -16, -64)} ));

abilityConsoleScene.cards.push(new Card(323, 270, 100, 75, null, () => { // enter
    abilityConsoleScene.frame = 2;
    

    switch (abilityOverlayCard.frame) {
        case 0:
            longitudeAbility();
            break;
        case 1:
            latitudeAbility();
            break;
        case 2:
            radius2kAbility();
            break;
        case 3: 
            radius4kAbility();
            break;
        case 4:
            radius8kAbility();
            break;
        case 5:
            distanceAbility();
            break;
        case 6:
            /* intersect */
            break;
        case 7:
            bouyAbility();
            break;
        case 8:
            /* heat */
            break;

    }

    let newSound = notif.cloneNode(); // !!! unoptomized
    newSound.currentTime = 0.4;
    newSound.volume = 0.05;
    newSound.play();

    abilityOverlayCard.frame = 9;

}, () => {setCursor("hand_hover.png", -16, -64)} ));

abilityConsoleScene.cards.push(new Card(430, 270, 75, 75, null, () => { // right button
    
    abilityConsoleScene.frame = 3;
    abilityOverlayCard.frame < 8 && abilityOverlayCard.frame++;

    let newSound = abilityConsoleClick.cloneNode(); // !!! unoptomized
    newSound.volume = 0.05;
    newSound.play();

}, () => {setCursor("hand_hover.png", -16, -64)} ));

// Navigate Back
abilityConsoleScene.cards.push(new Card(0, 0, 222, 480, null, () => { currentScene = mainScene }, () => {setCursor("down.png", -16, -64)} ));
abilityConsoleScene.cards.push(new Card(222, 0, 854, 200, null, () => { currentScene = mainScene }, () => {setCursor("down.png", -16, -64)} ));



// LAUNCH SCENE
const launchScene = new Scene("./art/environment/launchscene.png", 854);
SCENES.push(launchScene);

// launchScreen Overlay
// Overlay Card
let launchSceneOverlayCard = new Card(
    315, 194, 67, 38,
    new Texture("./art/environment/launchscene_screenoverlay.png", 67)
)
launchScene.cards.push(launchSceneOverlayCard);

let launchCode = "";
function keyPad(number) {
    
    if (number == 0) {
        launchScene.frame = 2;
        launchCode += "0";
    }
    else if (number == -1) { // backspace
        launchScene.frame = 1;
        launchCode = launchCode.slice(0, -1);
    } else {
        launchScene.frame = 12 - number;
        launchCode += `${number}`;
    }

    if (launchCode.length > 4) {
        launchCode = launchCode.charAt(4);
    }

    let newSound = numpads[launchCode.length - 1].cloneNode(); // !!! unoptomized
    newSound.volume = 0.05;
    newSound.play();
}

let launchCodeOverlayCard = new Card(315, 194, 67, 38);
let launchPreviousScene = null;
launchCodeOverlayCard.customRender = (ctx) => {

    ctx.font = "30px Consolas";

    ctx.fillText(launchCode, 315, 194+30);
}
launchScene.cards.push(launchCodeOverlayCard);

function launch() {
    launchScene.frame = 12;

    let x = Number(launchCode.slice(0, 2));
    let y = Number(launchCode.slice(2, 4));
    launchMissile(x, y);
    launchCode = "";

    let newSound = launchbutton.cloneNode(); // !!! unoptomized
    newSound.volume = 0.05;
    newSound.play();

    let newerSound = missilelaunch.cloneNode(); // !!! unoptomized
    newerSound.currentTime = -1;
    newerSound.volume = 0.05;
    newerSound.play();
}

// Buttons
launchScene.cards.push(new Card(300, 270, 32, 32, null, () => { keyPad(1) }, () => {setCursor("hand_hover_click.png", -16, -64)} ));
launchScene.cards.push(new Card(332, 270, 32, 32, null, () => { keyPad(2) }, () => {setCursor("hand_hover_click.png", -16, -64)} ));
launchScene.cards.push(new Card(364, 270, 32, 32, null, () => { keyPad(3) }, () => {setCursor("hand_hover_click.png", -16, -64)} ));

launchScene.cards.push(new Card(300, 302, 32, 32, null, () => { keyPad(4) }, () => {setCursor("hand_hover_click.png", -16, -64)} ));
launchScene.cards.push(new Card(332, 302, 32, 32, null, () => { keyPad(5) }, () => {setCursor("hand_hover_click.png", -16, -64)} ));
launchScene.cards.push(new Card(364, 302, 32, 32, null, () => { keyPad(6) }, () => {setCursor("hand_hover_click.png", -16, -64)} ));

launchScene.cards.push(new Card(300, 334, 32, 32, null, () => { keyPad(7) }, () => {setCursor("hand_hover_click.png", -16, -64)} ));
launchScene.cards.push(new Card(332, 334, 32, 32, null, () => { keyPad(8) }, () => {setCursor("hand_hover_click.png", -16, -64)} ));
launchScene.cards.push(new Card(364, 334, 32, 32, null, () => { keyPad(9) }, () => {setCursor("hand_hover_click.png", -16, -64)} ));

launchScene.cards.push(new Card(332, 366, 32, 32, null, () => { keyPad(0) }, () => {setCursor("hand_hover_click.png", -16, -64)} ));
launchScene.cards.push(new Card(364, 366, 32, 32, null, () => { keyPad(-1) }, () => {setCursor("hand_hover_click.png", -16, -64)} ));

launchScene.cards.push(new Card(430, 180, 164, 180, null, () => { launch() }, () => {setCursor("hand_hover.png", -16, -64)} ));

// Go Back
launchScene.cards.push(new Card(215, 410, 453, 69, null, () => { currentScene = launchPreviousScene }, () => {setCursor("down.png", -16, -64)} ));
launchScene.cards.push(new Card(0, 0, 215, 480, null, () => { currentScene = launchPreviousScene }, () => {setCursor("down.png", -16, -64)} ));
launchScene.cards.push(new Card(668, 0, 186, 480, null, () => { currentScene = launchPreviousScene }, () => {setCursor("down.png", -16, -64)} ));



// MAP SCENE
const mapScene = new Scene("./art/environment/mapscene.png", 854);
SCENES.push(mapScene);

mapScene.cards.push(new Card(720, 0, 134, 480, null, () => { currentScene = mainScene }, () => {setCursor("right.png", -16, -64)} ));
mapScene.cards.push(new Card(575, 222, 144, 75, null, () => {
    launchPreviousScene = currentScene;
    currentScene = launchScene;
}, () => {setCursor("hand_hover.png", -16, -64)} ));
mapScene.cards.push(new Card(111, 245, 345, 222, null, () => { currentScene = drawMapScene }, () => {setCursor("hand_hover_click.png", -16, -64)} ));
mapScene.cards.push(new Card(500, 250, 50, 30, null, () => {
    tutorialPreviousScene = currentScene;
    currentScene = tutorialScene; 
}, () => {setCursor("hand_hover_click.png", -16, -64)} ));




// DRAW MAP SCENE
const drawMapScene = new Scene("./art/environment/drawmapscene.png", 854);
SCENES.push(drawMapScene);

let drawingOverlayCard = new Card(179, 64, 495, 352, null, mapClick, mapHover, mapRender);
drawMapScene.cards.push(drawingOverlayCard);

// State
let newLine = true;
const lineSegments = [];

function mapClick(ctx) {

}

let drawingSound = drawing.cloneNode();
drawingSound.loop = true;
function mapHover(x, y, ctx) {

    setCursor("pencil.png", -16, -64);
    // setCursor("eraser.png", -16, -64);

    ctx.strokeStyle = "black";

    if (!mouseDown) {
        ctx.moveTo(x, y);
        newLine = true;

        drawingSound.pause();
        return;
    }
    drawingSound.play();

    // if (!leftClick) {

    //     let eraser = new Circle(x, y, 10);

    //     let erasedAny = false;
    //     let erasedPrevious = false;
    //     for (let i = 0; i < lineSegments.length; i++) {
            
    //         if (erasedPrevious) {
    //             lineSegments[i].newLine = true;
    //             erasedPrevious = false;
    //         }

    //         let point = new Point(lineSegments[i].x, lineSegments[i].y);

    //         if (eraser.overlaps(point)) {
    //             lineSegments.splice(i, 1);
    //             erasedPrevious = true;
    //             erasedAny = true;
    //         }
    //     }

    //     mapRender(ctx);
    //     return;
    // }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    lineSegments.push({x, y, newLine});
    newLine = false;

}

function mapRender(ctx) {
    ctx.strokeStyle = "black";
    ctx.beginPath;
    for (let lineSegment of lineSegments) {
        lineSegment.newLine && ctx.moveTo(lineSegment.x, lineSegment.y);
        !lineSegment.newLine && ctx.lineTo(lineSegment.x, lineSegment.y);
    }
    ctx.stroke();

}


// Navigation
drawMapScene.cards.push(new Card(0, 0, 150, 480, null, () => { currentScene = mapScene }, () => {setCursor("down.png", -16, -64)} ));
drawMapScene.cards.push(new Card(700, 0, 154, 480, null, () => { currentScene = mapScene }, () => {setCursor("down.png", -16, -64)} ));



// TUTORIAL SCENE
const tutorialScene = new Scene("./art/environment/tutorialScene.png", 854);
SCENES.push(tutorialScene);

let tutorialPreviousScene = null;
tutorialScene.cards.push(new Card(0, 0, 256, 480, null, () => { currentScene = tutorialPreviousScene }, () => {setCursor("down.png", -16, -64)} ));
tutorialScene.cards.push(new Card(555, 0, 300, 480, null, () => { currentScene = tutorialPreviousScene }, () => {setCursor("down.png", -16, -64)} ));
