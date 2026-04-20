import Ship from '../src/Ship.js';
import { notif } from "./audio.js";

const ships = [
    new Ship(0, 0, 5, "rgba(0, 200, 0, 0.8)"),
    new Ship(0, 0, 5,"rgba(200, 0, 0, 0)"), // !!! set to 0.8 to visualize
    new Ship(0, 0, 5, "rgba(0, 0, 200, 0.8)"),
]

let abilityVisual = { text: ""};

function setAbilityVisual(visual) {
    notif.play();
    notif.currentTime = 0.4;
    Object.assign(abilityVisual, visual);
}

export {
    ships,
    abilityVisual,
    setAbilityVisual
}