import Theatre from '../easel/Theatre.js';
import Texture from '../easel/Texture.js';
import Velocity from '../easel/Velocity.js';
import { Circle, Rectangle } from '../easel/Shape.js';
import { Card, Scene } from '../src/Scene.js';
import { currentScene } from './scenes.js';
import { ships, abilityVisual } from './state.js';
import { startTrack } from './audio.js';


// Theatre Setup
const canvasElement = document.getElementById("theatre");
const theatre = new Theatre(canvasElement, 854, 480);
theatre.heightConsistent = true;
theatre.makeFullScreen();

// Interaction
theatre.addEventListener("contextmenu", (e) => e.preventDefault());
theatre.addEventListener("pointermove", mouseMove);
theatre.addEventListener("pointerdown", onClick);

export let mouseDown = false;
export let leftClick = false;
theatre.addEventListener("pointerdown", () => {
    mouseDown = true;
    if (event.button === 0) { leftClick = true } else { leftClick = false; }
});
theatre.addEventListener("pointerup", () => {
    mouseDown = false
});

function mouseMove(event) {
    let {x, y} = theatre.getEventCoordinates(event);
    currentScene.hover(x, y, theatre.ctx);
}

function onClick(event) {
    let {x, y} = theatre.getEventCoordinates(event);
    currentScene.click(x, y, theatre.ctx);
    startTrack(); // !!! for audio, start on first click
}


// Main Loops

function render() {

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